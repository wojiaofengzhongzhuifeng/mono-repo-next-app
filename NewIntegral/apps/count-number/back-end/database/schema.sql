-- Create numbers table for managing count numbers
CREATE TABLE IF NOT EXISTS numbers (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    value INTEGER NOT NULL,
    label VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_numbers_status ON numbers(status);
CREATE INDEX IF NOT EXISTS idx_numbers_created_at ON numbers(created_at);
CREATE INDEX IF NOT EXISTS idx_numbers_value ON numbers(value);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_numbers_updated_at
    BEFORE UPDATE ON numbers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO numbers (value, label, description, status) VALUES
(100, '第一个数字', '这是第一个示例数字', 'active'),
(200, '第二个数字', '这是第二个示例数字', 'active'),
(300, '第三个数字', '这是第三个示例数字', 'inactive'),
(400, '第四个数字', '这是第四个示例数字', 'active'),
(500, '第五个数字', '这是第五个示例数字', 'inactive');

-- Create Row Level Security (RLS) policies
ALTER TABLE numbers ENABLE ROW LEVEL SECURITY;

-- Policy for users to read only active numbers
CREATE POLICY "Users can view active numbers"
    ON numbers FOR SELECT
    USING (status = 'active');

-- Policy for admin to manage all numbers (when using service role key, RLS is bypassed)
-- Note: With service role key, RLS is automatically bypassed for admin operations