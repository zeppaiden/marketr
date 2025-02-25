import { db } from "@/server/db"
import { test } from "@/server/db/schema"

async function main() {
  console.log("Seeding database...")
  
  // Create test data
  const testData = [
    {
      name: "Test Item 1",
      description: "This is a description for test item 1"
    },
    {
      name: "Test Item 2",
      description: "This is a description for test item 2"
    },
    {
      name: "Test Item 3",
      description: "This is a description for test item 3"
    },
    {
      name: "Test Item 4",
      description: null
    },
    {
      name: "Test Item 5",
      description: "This is a description for test item 5"
    },
  ]
  
  try {
    // Delete existing records (optional - remove if you want to keep existing data)
    await db.delete(test)
    console.log("Deleted existing test data")
    
    // Insert new records
    const insertedData = await db.insert(test).values(testData).returning()
    console.log(`Inserted ${insertedData.length} test records`)
    console.log(insertedData)
    
    console.log("Seed completed successfully")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    // Close the connection
    process.exit(0)
  }
}

main().catch((err) => {
  console.error("Error in seed script:", err)
  process.exit(1)
}) 