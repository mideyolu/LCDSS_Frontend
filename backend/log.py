from database import get_db
from models import Log
from datetime import datetime, timedelta
from sqlalchemy import delete, func
from sqlalchemy.ext.asyncio import AsyncSession
from apscheduler.schedulers.background import BackgroundScheduler


# Function to delete logs older than 5 hours
async def delete_old_logs(db: AsyncSession):
    try:
        retention_period = 5  # Hours
        cutoff_date = datetime.utcnow() - timedelta(hours=retention_period)

        # Delete logs older than the cutoff date
        delete_query = delete(Log).where(Log.created_at < cutoff_date)
        await db.execute(delete_query)
        await db.commit()

        print(f"Old logs deleted successfully up to {cutoff_date}")
    except Exception as e:
        print(f"Error during log cleanup: {str(e)}")


# Background task to schedule log cleanup
def schedule_log_cleanup():
    scheduler = BackgroundScheduler()
    scheduler.add_job(
        func=lambda: delete_old_logs(next(get_db())),  # Ensure the database session is passed correctly
        trigger="interval",
        hours=5,  # Run every 5 hours
    )
    scheduler.start()
