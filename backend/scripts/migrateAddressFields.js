import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const migrateAddressFields = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;

    // Migrate CustomerProfile addresses
    console.log('\n--- Migrating CustomerProfile addresses ---');
    const customerProfileResult = await db.collection('customerprofiles').updateMany(
      { 'addresses.state': { $exists: true } },
      [
        {
          $set: {
            addresses: {
              $map: {
                input: '$addresses',
                as: 'addr',
                in: {
                  $mergeObjects: [
                    '$$addr',
                    {
                      province: '$$addr.state',
                      postalCode: '$$addr.zipCode'
                    }
                  ]
                }
              }
            }
          }
        },
        {
          $set: {
            addresses: {
              $map: {
                input: '$addresses',
                as: 'addr',
                in: {
                  $arrayToObject: {
                    $filter: {
                      input: { $objectToArray: '$$addr' },
                      as: 'field',
                      cond: { $not: [{ $in: ['$$field.k', ['state', 'zipCode']] }] }
                    }
                  }
                }
              }
            }
          }
        }
      ]
    );
    console.log(`CustomerProfile: Updated ${customerProfileResult.modifiedCount} documents`);

    // Migrate Order delivery addresses
    console.log('\n--- Migrating Order delivery addresses ---');
    const orderResult = await db.collection('orders').updateMany(
      { 'deliveryAddress.state': { $exists: true } },
      [
        {
          $set: {
            'deliveryAddress.province': '$deliveryAddress.state',
            'deliveryAddress.postalCode': '$deliveryAddress.zipCode'
          }
        },
        {
          $unset: ['deliveryAddress.state', 'deliveryAddress.zipCode']
        }
      ]
    );
    console.log(`Orders: Updated ${orderResult.modifiedCount} documents`);

    // Migrate Store addresses
    console.log('\n--- Migrating Store addresses ---');
    const storeResult = await db.collection('stores').updateMany(
      { 'address.state': { $exists: true } },
      [
        {
          $set: {
            'address.province': '$address.state',
            'address.postalCode': '$address.zipCode'
          }
        },
        {
          $unset: ['address.state', 'address.zipCode']
        }
      ]
    );
    console.log(`Stores: Updated ${storeResult.modifiedCount} documents`);

    console.log('\n✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrateAddressFields();
