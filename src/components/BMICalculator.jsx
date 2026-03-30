import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Info, Ruler, Weight } from 'lucide-react';

const BMICalculator = () => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('text-emerald-500');

  useEffect(() => {
    const hInMeters = height / 100;
    const calculatedBmi = weight / (hInMeters * hInMeters);
    setBmi(calculatedBmi.toFixed(1));

    if (calculatedBmi < 18.5) {
      setCategory('Underweight');
      setColor('text-blue-400');
    } else if (calculatedBmi < 25) {
      setCategory('Normal');
      setColor('text-emerald-500');
    } else if (calculatedBmi < 30) {
      setCategory('Overweight');
      setColor('text-orange-400');
    } else {
      setCategory('Obese');
      setColor('text-rose-500');
    }
  }, [weight, height]);

  return (
    <div className="w-full max-w-lg mx-auto animate-in fade-in zoom-in duration-500">
      <div className="glass-card p-10 flex flex-col gap-10">
        {/* Header */}
        <div className="flex items-center gap-5">
          <div className="p-4 bg-accent-purple/10 border border-accent-purple/20 rounded-2xl">
            <Activity className="w-6 h-6 text-accent-purple" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Body Mass Index</h2>
            <p className="text-xs text-white/30 uppercase tracking-[0.2em] font-bold">Health Monitor</p>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-12">
          {/* Weight */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                <Weight className="w-3.5 h-3.5" /> Weight (kg)
              </label>
              <span className="text-2xl font-bold text-white pr-2">{weight}</span>
            </div>
            <input 
              type="range" min="30" max="200" value={weight} 
              onChange={(e) => setWeight(e.target.value)}
              className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-accent-purple"
            />
          </div>

          {/* Height */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                <Ruler className="w-3.5 h-3.5" /> Height (cm)
              </label>
              <span className="text-2xl font-bold text-white pr-2">{height}</span>
            </div>
            <input 
              type="range" min="100" max="230" value={height} 
              onChange={(e) => setHeight(e.target.value)}
              className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-accent-blue"
            />
          </div>
        </div>

        {/* Result Area */}
        <motion.div 
          layout
          className="p-8 bg-white/5 border border-white/5 rounded-[2rem] flex flex-col items-center gap-4 text-center mt-6 group"
        >
          <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mb-2">Calculated BMI</div>
          <motion.div 
            key={bmi}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-7xl font-bold tracking-tighter ${color}`}
          >
            {bmi}
          </motion.div>
          
          <div className="flex flex-col gap-2">
            <div className={`text-lg font-bold tracking-wide transition-colors ${color}`}>
              {category}
            </div>
            <p className="text-[11px] text-white/30 leading-relaxed max-w-[200px]">
              {category === 'Normal' ? 'Maintaining this BMI reduces health risks significantly.' : 'Consistently monitor and consult healthcare professionals.'}
            </p>
          </div>
        </motion.div>

        {/* Info Box */}
        <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 items-start">
          <Info className="w-5 h-5 text-white/20 mt-1 shrink-0" />
          <p className="text-[11px] text-white/40 leading-relaxed">
            BMI is a screening tool, not a diagnostic of body fatness or overall health. Results may vary by muscle mass and age.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
