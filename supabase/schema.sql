-- Create tasks table
create table tasks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  description text,
  status text check (status in ('todo', 'in-progress', 'done')) default 'todo',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table tasks enable row level security;

-- Create policy: Users can only access their own tasks
create policy "Users can access their own tasks" on tasks
  for all using (auth.uid() = user_id);