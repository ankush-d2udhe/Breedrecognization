/**
 * Image processing utilities
 * Handles image compression and conversion
 */

// Maximum dimensions for image resizing
const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;
// Maximum file size in bytes (1MB)
const MAX_FILE_SIZE = 1 * 1024 * 1024;

/**
 * Compress an image file to reduce size
 * @param file The image file to compress
 * @param options Compression options
 * @returns Promise with the compressed file
 */
export const compressImage = async (
  file: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    maxSizeBytes?: number;
  } = {}
): Promise<File> => {
  // If file is already small enough, return it as is
  if (file.size <= (options.maxSizeBytes || MAX_FILE_SIZE)) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        const maxWidth = options.maxWidth || MAX_WIDTH;
        const maxHeight = options.maxHeight || MAX_HEIGHT;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
        
        // Create canvas for resizing
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress image
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob with quality setting
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Could not compress image'));
              return;
            }
            
            // Create new file from blob
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            
            resolve(compressedFile);
          },
          file.type,
          options.quality || 0.7
        );
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
  });
};

/**
 * Convert an image file to base64 string
 * @param file The image file to convert
 * @returns Promise with the base64 string (without data URL prefix)
 */
export const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      // Remove data:image/jpeg;base64, prefix
      resolve(base64String.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Check if a file is a valid image
 * @param file The file to check
 * @returns Boolean indicating if the file is a valid image
 */
export const isValidImage = (file: File): boolean => {
  return file.type.startsWith('image/');
};

export default {
  compressImage,
  imageToBase64,
  isValidImage
};