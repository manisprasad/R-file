import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const students = [
  { name: "AADARSH YADAV", roll_number: "41523001" },
  { name: "ABDULLAH", roll_number: "41523003" },
  { name: "ABHIJEET KUMAR MISHRA", roll_number: "41523004" },
  { name: "ABHISHEK SINGH", roll_number: "41523006" },
  { name: "ADITHYAN R", roll_number: "41523007" },
  { name: "AKASH SINGH", roll_number: "41523009" },
  { name: "Aakash (LE)", roll_number: "240832043004" },
  { name: "AMAN", roll_number: "41523010" },
  { name: "AMAN KUMAR CHAUDHARY", roll_number: "41523011" },
  { name: "ANKUSH GUPTA", roll_number: "41523013" },
  { name: "ANUJ SINGH", roll_number: "41523014" },
  { name: "ARJUN PANDEY", roll_number: "41523015" },
  { name: "ARPIT", roll_number: "41523016" },
  { name: "ASHISH JHA", roll_number: "41523017" },
  { name: "ASHISH JHA", roll_number: "41523018" },
  { name: "AVINASH KUMAR", roll_number: "41523019" },
  { name: "AYUSH YADAV", roll_number: "41523021" },
  { name: "BHAVYA YAJUSH AWASTHI", roll_number: "41523024" },
  { name: "DEVANSH KANDHARI", roll_number: "41523027" },
  { name: "DEVANSH SINGH", roll_number: "41523028" },
  { name: "DHEERAJ", roll_number: "41523030" },
  { name: "GHULAME MUSTUFA", roll_number: "41523032" },
  { name: "GOURAV PANDEY", roll_number: "41523033" },
  { name: "Gaurav Sharma (LE)", roll_number: "240832043005" },
  { name: "HARDIK PANWAR", roll_number: "41523034" },
  { name: "HARSH KANDPAL", roll_number: "41523035" },
  { name: "HARSH RAJ THAKUR", roll_number: "41523036" },
  { name: "HARSH SINGH", roll_number: "41523037" },
  { name: "HARSH YADAV", roll_number: "41523038" },
  { name: "HEMANT", roll_number: "41523039" },
  { name: "HIMANI WASAN", roll_number: "41523040" },
  { name: "HIMANSHU JANGIR", roll_number: "41523041" },
  { name: "HRIDAY SINGHAL", roll_number: "41523042" },
  { name: "JAIVEER", roll_number: "41523043" },
  { name: "JAYANT VARSHNEY", roll_number: "41523044" },
  { name: "KANHIYA", roll_number: "41523046" },
  { name: "KARTIK YADAV", roll_number: "41523048" },
  { name: "KHUSHI LAKRA", roll_number: "41523049" },
  { name: "KRISHNA MISHRA", roll_number: "41523050" },
  { name: "KRITIKA", roll_number: "41523051" },
  { name: "KRITIKA MISHRA", roll_number: "41523052" },
  { name: "LAKSHAY ANAND", roll_number: "41523053" },
  { name: "MANISH KUMAR", roll_number: "41523055" },
  { name: "MANISH PRASAD", roll_number: "41523056" },
  { name: "Dev Kumar", roll_number: "240832043006" },
  { name: "Anubhav Gautam", roll_number: "240832043007" }
];

interface FormData {
  roll_no: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    roll_no: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState({
    roll_no: false
  });
  const [suggestions, setSuggestions] = useState<{name: string, roll_number: string}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<{name: string, roll_number: string} | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (value.length > 0) {
      const filtered = students.filter(student => 
        student.roll_number.includes(value) || 
        student.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (student: {name: string, roll_number: string}) => {
    setFormData({
      roll_no: student.roll_number
    });
    setSelectedStudent(student);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleFocus = (field: string) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
    if (formData.roll_no.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = (field: string) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
    // Use setTimeout to allow click event to fire before hiding suggestions
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    

    try {
      // Include the selected student's name in the request
      const payload = {
        roll_no: formData.roll_no,
        name: selectedStudent?.name || ''
      };

      if(payload.name === '') {
       toast.error('Please select Your name from the suggestions');
        return;
      }
      if(payload.name === 'AVINASH KUMAR' || payload.name === 'LAKSHAY ANAND'){
        alert(`sorry ${payload.name}, contact me directly` );
       return;
      }

      if(payload.name === 'MANISH KUMAR' || payload.name === 'ANUJ SINGH' || payload.name === 'KANHIYA'){
        toast.error(`sorry ${payload.name} bete, Ek bar papa bol , fir download hoga` );
       return;
      }

      //all girs name condition
      if(payload.name === 'HIMANI WASAN' || payload.name === 'KHUSHI LAKRA' || payload.name === 'KRITIKA' || payload.name === 'KRITIKA MISHRA'){
        toast.success(`Nice Day, ${payload.name}` );
      }

      if(payload.name === 'Gaurav Sharma (LE)'){
        toast.error("Chala ja bsdk" );
        return;
      }

      if(payload.name === 'HARSH YADAV'){
        toast.error("Bhai Tu to Phone se cheating karta hai ..." );
        return;
      }

      if(payload.name === 'Dev Kumar'){
        toast.error("Bhen ka land chala ja yaha se" );
        return;
      }
      if(payload.name === 'BHAVYA YAJUSH AWASTHI'){
        toast.error("Bhai terko bhi jarurat hai kya?? koi nahi dekh le " );
        
      }

      const response: AxiosResponse<Blob> = await axios.post(
        'https://r-file-backend.vercel.app/process-pdf', 
        payload, 
        {
          responseType: 'blob'
        }
      );
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download', 
        `processed_${selectedStudent?.name.replace(' ', '_') || 'unknown'}_${formData.roll_no}.pdf`
      );
      document.body.appendChild(link);
      link.click();
  
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
  
      setSuccess(true);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response && error.response.data) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const errorData = JSON.parse(reader.result as string);
            setError(errorData.error || 'An error occurred');
          } catch (e) {
            setError('Failed to process PDF');
          }
        };
        reader.readAsText(error.response.data as Blob);
      } else {
        setError(error.message || 'Failed to process PDF');
      }
    } finally {
      setLoading(false);
      
    }
    setSuccess(true)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="p-8">
          <Toaster/>
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">R Lab File</h1>
          </div>
          
          <p className="text-center text-gray-600 mb-8">Enter your roll number to get your customized PDF 🚀</p>
           {
            error || isFocused && null
          }
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
             
              <input
                type="text"
                id="roll_no"
                name="roll_no"
                value={formData.roll_no}
                onChange={handleChange}
                onFocus={() => handleFocus('roll_no')}
                onBlur={() => handleBlur('roll_no')}
                required
                placeholder='Enter Your Name / Roll Number' 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                autoComplete="off"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {suggestions.map((student, index) => (
                    <div 
                      key={index}
                      className="px-4 py-2 hover:bg-purple-50 cursor-pointer flex justify-between"
                      onClick={() => handleSuggestionClick(student)}
                    >
                      <span>{student.roll_number}</span>
                      <span className="text-gray-500 truncate ml-2">{student.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {selectedStudent && (
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-purple-800 font-medium">{selectedStudent.name}</p>
                <p className="text-purple-600 text-sm">{selectedStudent.roll_number}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={loading || !formData.roll_no} 
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
                loading || !formData.roll_no
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              } flex items-center justify-center`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Working on it...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Generate My PDF
                </>
              )}
            </button>
            
      
            {success && (
              <div className="p-3 bg-green-50 text-green-600 rounded-lg flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>PDF ready! Check your downloads 💫</span>
              </div>
            )}
          </form>
        </div>
        
        <div className="bg-gray-50 px-8 py-4 text-center">  
          <p className="text-sm text-gray-500">Made with ❤️ for DSEU CSE 1 people</p>
        </div>
      </div>
      <footer className="mt-8 text-center text-gray-500">
        <p className="text-lg">© 2025 Manish Prasad. All rights reserved.</p>
        <p className="text-xs">Built for selected people</p>
      </footer> 
    </div>
  );
};

export default App;
