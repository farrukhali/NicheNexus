import { Client } from 'pg'

const connectionString = 'postgresql://postgres:iQL5EiIt5OgKICYa@db.cefyurrnjwecbijwucxt.supabase.co:5432/postgres'

const client = new Client({
    connectionString,
})

async function inspectSchema() {
    try {
        await client.connect()
        console.log('Connected to PostgreSQL')

        // List tables
        const resTables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `)

        console.log('Tables found:', resTables.rows.map(r => r.table_name))

        for (const table of resTables.rows) {
            const tableName = table.table_name
            console.log(`\nColumns for table '${tableName}':`)
            const resColumns = await client.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = $1
      `, [tableName])

            console.table(resColumns.rows)

            // Peek data
            console.log(`Preview of '${tableName}':`)
            const resPreview = await client.query(`SELECT * FROM "${tableName}" LIMIT 3`)
            console.log(resPreview.rows)
        }

    } catch (err) {
        console.error('Database error:', err)
    } finally {
        await client.end()
    }
}

inspectSchema()
