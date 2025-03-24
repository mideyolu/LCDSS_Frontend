from PIL import Image


def resize_image(input_path, output_path, size=(150, 150)):
    """
    Resize an image to the given size and save it.

    :param input_path: Path to the input image file.
    :param output_path: Path to save the resized image.
    :param size: Tuple (width, height), default is (150, 150).
    """
    try:
        with Image.open(input_path) as img:
            img_resized = img.resize(size, Image.LANCZOS)
            img_resized.save(output_path)
            print(f"Image successfully resized and saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")


# Example Usage
resize_image("ismail.jpg", "ismail1.jpg")
