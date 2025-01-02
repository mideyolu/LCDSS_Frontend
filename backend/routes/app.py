import tensorflow as tf

# Load the existing TensorFlow model
model = tf.keras.models.load_model('../Ismail-Lung-Model.h5')

# Convert to TensorFlow Lite format
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

# Save the converted TFLite model
with open('core/Ismail-Lung-Model.tflite', 'wb') as f:
    f.write(tflite_model)

print("Model converted to TFLite format successfully!")
