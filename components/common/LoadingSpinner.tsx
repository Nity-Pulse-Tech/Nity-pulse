'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="relative w-32 h-32 mb-8">
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary"
        ></motion.div>
        
        {/* Middle pulsing ring */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-4 rounded-full border-4 border-secondary/30"
        ></motion.div>
        
        {/* Logo with subtle pulse */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-8 flex items-center justify-center"
        >
          <Image
            src="/logo_sans_fond.png"
            alt="Nity Pulse Logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </motion.div>
        
        {/* Floating dots */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              rotate: 360,
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              rotate: { duration: 4, repeat: Infinity, ease: "linear" }
            }}
            className="absolute w-3 h-3 bg-secondary rounded-full"
            style={{
              top: `${Math.sin((i * 2 * Math.PI) / 3) * 40 + 50}%`,
              left: `${Math.cos((i * 2 * Math.PI) / 3) * 40 + 50}%`,
              transform: 'translate(-50%, -50%)'
            }}
          ></motion.div>
        ))}
      </div>
      
      {/* Text with typing animation */}
      <div className="text-center">
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-lg font-semibold text-primary mb-2"
        >
          Loading
        </motion.p>
        
        <motion.div
          className="flex justify-center space-x-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
              className="text-secondary text-xl font-bold"
            >
              .
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingSpinner;