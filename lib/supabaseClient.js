import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://gafvmakrbbhgvmxgwqld.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhZnZtYWtyYmJoZ3ZteGd3cWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM2MzA3NzAsImV4cCI6MTk4OTIwNjc3MH0.8L6WnDrNzUzmGuu16Xwibq0owJ0m5LfvQe72B9ypkEc"
);
