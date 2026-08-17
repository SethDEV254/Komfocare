import React, { useState } from 'react';
import { Activity, Heart, Thermometer, Droplet, Wind, Calendar } from 'lucide-react';
import { VitalSign } from '../../types';
import { formatDate } from '../../utils/formatters';

interface VitalsChartProps {
  vitalSigns: VitalSign[];
}

export const VitalsTrendChart: React.FC<VitalsChartProps> = ({ vitalSigns }) => {
  const [activeMetric, setActiveMetric] = useState<'bp' | 'hr' | 'spo2' | 'glucose' | 'temp'>('bp');

  if (!vitalSigns || vitalSigns.length === 0) {
    return (
      <div className="p-8 text-center glass-card rounded-2xl border border-white/10 text-xs text-slate-400 font-mono">
        No vital signs logged yet. Clinician measurements will appear here after home visits.
      </div>
    );
  }

  const latest = vitalSigns[vitalSigns.length - 1];

  return (
    <div className="rounded-3xl p-6 sm:p-8 glass-card border border-white/15 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-display text-white">
            Vital Signs & Clinical Monitoring
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 font-sans">
            Historical measurements recorded during nurse & clinician visits
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveMetric('bp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeMetric === 'bp'
                ? 'bg-komfo-600 text-white shadow-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Blood Pressure
          </button>
          <button
            onClick={() => setActiveMetric('hr')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeMetric === 'hr'
                ? 'bg-komfo-600 text-white shadow-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Heart Rate
          </button>
          <button
            onClick={() => setActiveMetric('spo2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeMetric === 'spo2'
                ? 'bg-komfo-600 text-white shadow-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            SpO2 %
          </button>
          <button
            onClick={() => setActiveMetric('glucose')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeMetric === 'glucose'
                ? 'bg-komfo-600 text-white shadow-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Glucose
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 font-mono">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-semibold">Blood Pressure</span>
            <Activity className="w-4 h-4 text-komfo-400" />
          </div>
          <p className="text-xl font-bold text-white">
            {latest.systolicBP || '--'}/{latest.diastolicBP || '--'}{' '}
            <span className="text-xs font-normal text-slate-400">mmHg</span>
          </p>
          <span className="text-[10px] text-emerald-400 font-semibold font-sans">Normal Clinical Range</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 font-mono">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-semibold">Heart Rate</span>
            <Heart className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-xl font-bold text-white">
            {latest.heartRate || '--'}{' '}
            <span className="text-xs font-normal text-slate-400">bpm</span>
          </p>
          <span className="text-[10px] text-slate-400 font-sans">Resting Pulse</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 font-mono">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-semibold">SpO2 Saturation</span>
            <Wind className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-xl font-bold text-white">
            {latest.spO2 || '--'}{' '}
            <span className="text-xs font-normal text-slate-400">%</span>
          </p>
          <span className="text-[10px] text-emerald-400 font-semibold font-sans">Optimal Oxygenation</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 font-mono">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-semibold">Blood Glucose</span>
            <Droplet className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-xl font-bold text-white">
            {latest.bloodGlucose || '--'}{' '}
            <span className="text-xs font-normal text-slate-400">mmol/L</span>
          </p>
          <span className="text-[10px] text-slate-400 font-sans">Fasting / Pre-meal</span>
        </div>
      </div>

      {/* Visual Bars Timeline */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
          Recorded Timeline History
        </h4>

        <div className="space-y-3">
          {vitalSigns.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between text-xs font-mono"
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-komfo-400" />
                <div>
                  <p className="font-semibold text-white font-sans">{formatDate(item.recordedAt)}</p>
                  <p className="text-[11px] text-slate-400">{item.recordedByName}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">BP: </span>
                  <span className="font-bold text-white">{item.systolicBP}/{item.diastolicBP}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">HR: </span>
                  <span className="font-bold text-white">{item.heartRate} bpm</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">SpO2: </span>
                  <span className="font-bold text-white">{item.spO2}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
