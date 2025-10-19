import React, { useState, useEffect } from 'react';
import { supabase } from '../src/supabaseClient';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const AdminContactSubmissions: React.FC = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError('Error fetching contact submissions: ' + error.message);
        return;
      }

      setSubmissions(data || []);
    } catch (err) {
      setError('Error fetching contact submissions: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4 text-red-300">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
      <h2 className="text-2xl font-bold text-white mb-6">Contact Form Submissions</h2>
      
      {submissions.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>No contact submissions yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-700">
              <tr>
                <th className="pb-3 text-gray-300 font-semibold">Date</th>
                <th className="pb-3 text-gray-300 font-semibold">Name</th>
                <th className="pb-3 text-gray-300 font-semibold">Email</th>
                <th className="pb-3 text-gray-300 font-semibold">Message</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                  <td className="py-3 text-gray-400">
                    {new Date(submission.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-white font-medium">
                    {submission.name}
                  </td>
                  <td className="py-3 text-cyan-400">
                    <a href={`mailto:${submission.email}`} className="hover:underline">
                      {submission.email}
                    </a>
                  </td>
                  <td className="py-3 text-gray-300">
                    {submission.message.substring(0, 100)}
                    {submission.message.length > 100 ? '...' : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminContactSubmissions;