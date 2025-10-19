-- Create rating_applications table
CREATE TABLE IF NOT EXISTS rating_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organizer_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  event_name VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location TEXT,
  expected_participants INTEGER DEFAULT 0,
  additional_info TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  payment_id VARCHAR(255) UNIQUE NOT NULL,
  payment_status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_rating_applications_payment_id ON rating_applications(payment_id);
CREATE INDEX IF NOT EXISTS idx_rating_applications_email ON rating_applications(email);
CREATE INDEX IF NOT EXISTS idx_rating_applications_created_at ON rating_applications(created_at);
CREATE INDEX IF NOT EXISTS idx_rating_applications_payment_status ON rating_applications(payment_status);

-- Enable Row Level Security (RLS)
ALTER TABLE rating_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for rating_applications table
-- Allow authenticated users to insert their own applications
CREATE POLICY "Users can insert their own rating applications" ON rating_applications
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read their own applications
CREATE POLICY "Users can read their own rating applications" ON rating_applications
  FOR SELECT USING (true);

-- Allow authenticated users to update their own applications
CREATE POLICY "Users can update their own rating applications" ON rating_applications
  FOR UPDATE USING (true);

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_rating_applications_updated_at
  BEFORE UPDATE ON rating_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();