# Update Player Ratings from RT2 File

## Overview

This document explains how to update the player ratings on the PANASA website using the latest ratings data from the `panasa.RT2` file.

## Generated SQL File

The system has automatically generated an SQL update script:
- **File**: `update-players-from-rt2.sql`
- **Purpose**: Updates all player data in the database with the latest ratings
- **Content**: Contains DELETE and INSERT statements for all 900+ players

## How to Apply the Update

### Option 1: Using Supabase Dashboard (Recommended)

1. Log in to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the entire content of `update-players-from-rt2.sql`
4. Paste it into the SQL Editor
5. Click "Run" to execute the script

### Option 2: Using psql Command Line

1. Make sure you have psql installed and configured
2. Run the following command:
   ```bash
   psql -h your-supabase-host -d your-database-name -U your-username -f update-players-from-rt2.sql
   ```

### Option 3: Using Supabase CLI

1. Install the Supabase CLI if you haven't already
2. Run the following command:
   ```bash
   supabase db push
   ```

## What the Update Does

1. **Deletes all existing player data** from the `players` table
2. **Inserts all players** from the RT2 file with their current ratings
3. **Updates timestamps** to reflect the current update time

## Verification

After running the update, you can verify it was successful by:

1. Visiting the Players page on your website
2. Checking that the player count and ratings match the RT2 file
3. Running a query in Supabase to confirm the data:
   ```sql
   SELECT COUNT(*) as player_count, 
          MAX(rating) as highest_rating, 
          MIN(rating) as lowest_rating 
   FROM players;
   ```

## Important Notes

- The update is atomic - either all players are updated or none are (in case of an error)
- The script preserves the table structure and only updates the data
- All players are re-inserted with new UUIDs
- The operation will overwrite any existing player data

## Troubleshooting

If you encounter any issues:

1. **Check the Supabase logs** for any error messages
2. **Verify the database connection** is working properly
3. **Ensure you have the necessary permissions** to modify the players table
4. **Check that the database schema matches** the expected structure

## Future Updates

To update ratings in the future:

1. Replace the `panasa.RT2` file with the new version
2. Run the script generator:
   ```bash
   node update-ratings-from-rt2.mjs
   ```
3. Apply the generated SQL file using one of the methods above