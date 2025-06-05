useEffect(() => {
  const testSupabase = async () => {
    try {
      console.log('Testing Supabase connection...');
      const { data, error } = await supabase.auth.getSession();
      console.log('Supabase test result:', { data, error });
    } catch (err) {
      console.error('Supabase connection failed:', err);
    }
  };
  
  testSupabase();
}, []);
