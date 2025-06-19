import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const DB =
  'mongodb+srv://aminahmadov123:dBoAPy0wCrlWD1NE@cluster0.fzyts.mongodb.net/BARKARAS?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const backupItems = async () => {
  try {
    const db = mongoose.connection.db;
    const itemsCollection = db.collection('items');
    const backupName = `items_backup_itemsizes_${Date.now()}`;
    const backupCollection = db.collection(backupName);

    const allItems = await itemsCollection.find({}).toArray();
    if (allItems.length > 0) {
      await backupCollection.insertMany(allItems);
      console.log(
        `✅ Backup created with ${allItems.length} items in collection: ${backupName}`
      );
      return backupName;
    }
    return null;
  } catch (error) {
    console.error('❌ Backup failed:', error);
    throw error;
  }
};

const convertItemSizesToArray = async () => {
  try {
    const db = mongoose.connection.db;
    const itemsCollection = db.collection('items');

    // Find items where itemSizes exists but is NOT an array
    const itemsToConvert = await itemsCollection
      .find({
        itemSizes: {
          $exists: true,
          $not: { $type: 'array' },
        },
      })
      .toArray();

    console.log(
      `📊 Found ${itemsToConvert.length} items with single itemSizes object to convert`
    );

    if (itemsToConvert.length === 0) {
      console.log(
        "ℹ️  No items need conversion - all itemSizes are already arrays or don't exist"
      );
      return;
    }

    // Convert each item
    for (let i = 0; i < itemsToConvert.length; i++) {
      const item = itemsToConvert[i];

      // Wrap the existing itemSizes object in an array
      const updateData = {
        itemSizes: [item.itemSizes], // Convert single object to array with one element
      };

      await itemsCollection.updateOne({ _id: item._id }, { $set: updateData });

      // Progress indicator
      if ((i + 1) % 10 === 0 || i === itemsToConvert.length - 1) {
        console.log(`⏳ Converted ${i + 1}/${itemsToConvert.length} items`);
      }
    }

    console.log('✅ ItemSizes conversion completed successfully!');

    // Verify the conversion
    const remainingNonArrays = await itemsCollection.countDocuments({
      itemSizes: {
        $exists: true,
        $not: { $type: 'array' },
      },
    });

    const totalArrays = await itemsCollection.countDocuments({
      itemSizes: { $type: 'array' },
    });

    console.log(
      `🔍 Verification: ${totalArrays} items now have itemSizes as arrays`
    );
    console.log(
      `🔍 Verification: ${remainingNonArrays} items still have non-array itemSizes (should be 0)`
    );
  } catch (error) {
    console.error('❌ Conversion failed:', error);
    throw error;
  }
};

const runConversion = async () => {
  console.log('🚀 Starting ItemSizes Array Conversion...\n');

  try {
    await connectDB();

    // Create backup
    console.log('📦 Creating backup...');
    const backupName = await backupItems();

    // Run conversion
    console.log('\n🔄 Converting itemSizes to arrays...');
    await convertItemSizesToArray();

    console.log(`\n✅ Conversion completed successfully!`);
    if (backupName) {
      console.log(`📦 Backup stored in: ${backupName}`);
    }
  } catch (error) {
    console.error('\n❌ Conversion failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Handle script execution
if (process.argv[2] === '--confirm') {
  runConversion();
} else {
  console.log(
    '⚠️  This migration will convert itemSizes from objects to arrays.'
  );
  console.log('📋 It will:');
  console.log('   - Create a backup of existing items');
  console.log(
    '   - Convert single itemSizes objects to arrays containing that object'
  );
  console.log('   - Preserve all existing data in itemSizes');
  console.log('   - NOT touch any other fields');
  console.log('\n🔧 To run the conversion, use:');
  console.log('   node migrations/convert-itemsizes-to-array.js --confirm');
  console.log('\n💡 Make sure you have a database backup before running this!');
}
