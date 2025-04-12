import React, { useState, useEffect } from 'react';
import { Check, Mail, Phone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../config/api';

const FuturisticOrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    orderId = '', 
    total = 0, 
    name = 'Customer', 
    remainingPayment = 0,
  } = location.state || {};
  const [animationStage, setAnimationStage] = useState(0);
  const [emailStatus, setEmailStatus] = useState({ emailsSent: 0, emailErrors: [] });
  const [missedCallStatus, setMissedCallStatus] = useState(null);

  // Fix the initial timer value to 45
  const [timeToRedirect, setTimeToRedirect] = useState(45);

  // Combine both timer effects into one
  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    
    // Start countdown
    const countdownInterval = setInterval(() => {
      setTimeToRedirect((prev) => {
        // When timer reaches 0, navigate to home
        if (prev <= 1) {
          navigate('/', { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
      clearInterval(countdownInterval);
    };
  }, [navigate]); // Add navigate as dependency

  useEffect(() => {
    const stages = setTimeout(() => {
      setAnimationStage((prev) => (prev + 1) % 3);
    }, 1000);

    return () => clearTimeout(stages);
  }, [animationStage]);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await api.get(`/email-status/${orderId}`);
        setEmailStatus(response.data);
        setMissedCallStatus(response.data.missedCallStatus);
        
        if (response.data.emailsSent > 0 && response.data.missedCallStatus) {
          clearInterval(pollInterval);
        }
      } catch (error) {
        console.error('Error checking status:', error);
      }
    };

    const pollInterval = setInterval(checkStatus, 1000);
    return () => clearInterval(pollInterval);
  }, [orderId]);

  return (
    <div className="bg-black h-screen fixed inset-0 p-4">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.05)_1px),linear-gradient(transparent_24px,rgba(255,255,255,0.05)_1px)] bg-[size:25px_25px]" />
      </div>

      <div className="fixed bottom-0 right-1 z-50 space-y-3 w-64">
        {emailStatus.emailsSent > 0 && (
          <div className="bg-black/90 backdrop-blur-sm text-green-400 p-3 rounded-lg flex items-start gap-2 font-mono text-xs border border-green-400/20 shadow-lg animate-slideUpFade transform hover:scale-102 transition-all duration-300 hover:border-green-400/40 hover:-translate-y-0.5">
            <Mail className="w-3 h-3 mt-0.5 animate-pulse" />
            <div>
              <div className="font-bold tracking-wide flex items-center gap-2">
                EMAIL SENT
                <span className="text-[10px] bg-green-400/10 px-2 py-0.5 rounded">
                  {emailStatus.emailsSent}/2
                </span>
              </div>
              <div className="text-[10px] text-green-400/70 mt-0.5">
                {emailStatus.emailsSent === 1 
                  ? '→ Customer notified' 
                  : '→ Customer & vendor notified'}
              </div>
            </div>
          </div>
        )}

        {missedCallStatus === 'success' && (
          <div className="bg-black/90 backdrop-blur-sm text-green-400 p-3 rounded-lg flex items-start gap-2 font-mono text-xs border border-green-400/20 shadow-lg animate-slideUpFade transform hover:scale-102 transition-all duration-300 hover:border-green-400/40 hover:-translate-y-0.5">
            <Phone className="w-3 h-3 mt-0.5 animate-pulse" />
            <div>
              <div className="font-bold tracking-wide">MISSED CALL SENT</div>
              <div className="text-[10px] text-green-400/70 mt-0.5">
                → Vendor notification sent
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen -mt-16">
        <div className="flex items-center space-x-4 mb-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]" />
          <h2 className="text-3xl font-mono font-bold text-white">
            <span className="opacity-100">ORDER</span>{' '}
            <span className="relative">
              CONFIRMED
              <span className="absolute -inset-1 bg-white/10 -skew-x-12 -z-10" />
            </span>
          </h2>
        </div>

        <div className="text-2xl font-mono text-green-400 mb-3">
          THANK YOU, {name}!
        </div>

        <div className="border border-white/10 bg-black/90 p-4 mb-3 relative w-full max-w-lg">
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-green-400/30" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-green-400/30" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-green-400/30" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-green-400/30" />

          <p className="text-xl font-mono mb-3 text-white tracking-wide">
            PLEASE PAY <span className="text-green-400">₹{(total - remainingPayment).toLocaleString()}</span> UPON DELIVERY
          </p>
          <div className="space-y-1 text-white/70 text-sm">
            <p className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Delivery initiated</span>
            </p>
            <p className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>You will be notified once we reach your location in {location.state?.deliveryTime || '30-40'} minutes</span>
            </p>
            <p className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Kindly check your Gmail right now, for order info.</span>
            </p>
            <p className="flex items-center space-x-2 text-white/50 text-xs mt-2">
              <span>* If you don't see the email in your inbox, please check your spam folder.</span>
            </p>
          </div>
        </div>

        <div className="text-sm font-mono text-green-400/80 mb-3">
          ORDER_ID: <span className="text-white/70">#{orderId}</span>
          <div className="text-xs text-white/50 mt-2">
            Redirecting to home in {timeToRedirect} seconds...
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturisticOrderConfirmation;