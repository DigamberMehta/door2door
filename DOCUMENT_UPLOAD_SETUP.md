# Document Upload with Cloudinary & Multer - Setup Guide

## Backend Dependencies

Install the required packages:

```bash
cd backend
npm install cloudinary multer dotenv
```

## Environment Variables

Add the following to your `.env` file:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Get Cloudinary Credentials

1. Sign up at https://cloudinary.com
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Paste them in your `.env` file

## File Structure Created

### Backend:
- `config/cloudinary.js` - Cloudinary configuration and helpers
- `middleware/upload.js` - Multer middleware for file handling
- Updated `controllers/driverProfileController.js` - File upload logic
- Updated `routes/driverProfileRoutes.js` - Added multer middleware
- Updated `models/DeliveryRiderProfile.js` - Added cloudinaryPublicId fields

### Frontend (Delivery):
- `services/api/client.js` - Axios instance with interceptors
- `services/api/driverAuth.api.js` - Driver authentication API
- `services/api/driverProfile.api.js` - Driver profile API with file upload
- `services/api/index.js` - Central export
- `utils/api.js` - Legacy compatibility
- Updated `pages/profile/DocumentsPage.jsx` - File upload UI

## How It Works

### Backend Flow:
1. Driver uploads file from frontend
2. Multer receives file and saves temporarily to `./uploads`
3. File is uploaded to Cloudinary
4. Cloudinary URL and publicId are saved to MongoDB
5. Local file is deleted
6. Old document (if exists) is deleted from Cloudinary

### Frontend Flow:
1. User clicks upload button
2. File input opens
3. File is validated (size, type)
4. FormData is created with file
5. API call sends file to backend
6. Success/error message shown
7. Document status refreshed

## API Endpoints

### Upload Document
```
PUT /api/driver-profile/documents/:documentType
Content-Type: multipart/form-data
Authorization: Bearer <token>

Body:
- file: (file) - The document file
- number: (string) - Optional document number
- expiryDate: (date) - Optional expiry date
```

### Get Document Status
```
GET /api/driver-profile/documents/status
Authorization: Bearer <token>
```

## Document Types

- profilePhoto
- vehiclePhoto
- idDocument
- workPermit
- driversLicence
- proofOfBankingDetails
- proofOfAddress
- vehicleLicense
- thirdPartyInsurance
- vehicleAssessment
- carrierAgreement

## File Restrictions

- **Max Size**: 5MB
- **Allowed Types**: JPEG, JPG, PNG, WebP, PDF
- **Storage**: Cloudinary (cloud)
- **Folder**: `driver-documents/{userId}`

## Testing

```bash
# Test upload
curl -X PUT http://localhost:3000/api/driver-profile/documents/driversLicence \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/license.pdf" \
  -F "number=ABC123456" \
  -F "expiryDate=2027-12-31"
```

## Frontend Usage

```javascript
import { driverProfileAPI } from '@/services/api';

// Upload document
const file = event.target.files[0];
await driverProfileAPI.uploadDocument('driversLicence', file, {
  number: 'ABC123456',
  expiryDate: '2027-12-31'
});

// Get status
const { documents } = await driverProfileAPI.getDocumentsStatus();
```

## Security Features

✅ File type validation
✅ File size limits (5MB)
✅ Authentication required
✅ Can only upload if document is pending/rejected
✅ Verified documents are locked
✅ Old files automatically deleted from Cloudinary
✅ Local files cleaned up after upload
