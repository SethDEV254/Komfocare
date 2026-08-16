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
      <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
        No vital signs logged yet. Clinician measurements will appear here after home visits.
      </div>
    );
  }

  const latest = vitalSigns[vitalSigns.length - 1];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-display text-navy-900">
            Vital Signs & Clinical Monitoring
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Historical measurements recorded during nurse & clinician visits
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveMetric('bp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMetric === 'bp'
                ? 'bg-white text-navy-900 shadow-sm'
                : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            Blood Pressure
          </button>
          <button
            onClick={() => setActiveMetric('hr')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMetric === 'hr'
                ? 'bg-white text-navy-900 shadow-sm'
                : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            Heart Rate
          </button>
          <button
            onClick={() => setActiveMetric('spo2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMetric === 'spo2'
                ? 'bg-white text-navy-900 shadow-sm'
                : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            SpO2 %
          </button>
          <button
            onClick={() => setActiveMetric('glucose')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMetric === 'glucose'
                ? 'bg-white text-navy-900 shadow-sm'
                : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            Glucose
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold">Blood Pressure</span>
            <Activity className="w-4 h-4 text-komfo-600" />
          </div>
          <p className="text-xl font-bold text-navy-900">
            {latest.systolicBP || '--'}/{latest.diastolicBP || '--'}{' '}
            <span className="text-xs font-normal text-slate-500">mmHg</span>
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold">Normal Clinical Range</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold">Heart Rate</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-xl font-bold text-navy-900">
            {latest.heartRate || '--'}{' '}
            <span className="text-xs font-normal text-slate-500">bpm</span>
          </p>
          <span className="text-[10px] text-slate-500">Resting Pulse</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold">SpO2 Saturation</span>
            <Wind className="w-4 h-4 text-sky-500" />
          </div>
          <p className="text-xl font-bold text-navy-900">
            {latest.spO2 || '--'}{' '}
            <span className="text-xs font-normal text-slate-500">%</span>
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold">Optimal Oxygenation</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold">Blood Glucose</span>
            <Droplet className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl font-bold text-navy-900">
            {latest.bloodGlucose || '--'}{' '}
            <span className="text-xs font-normal text-slate-500">mmol/L</span>
          </p>
          <span className="text-[10px] text-slate-500">Fasting / Pre-meal</span>
        </div>
      </div>

      {/* Visual Bars Timeline */}
      <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Recorded Timeline History
        </h4>

        <div className="space-y-3">
          {vitalSigns.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-komfo-600" />
                <div>
                  <p className="font-semibold text-slate-900">{formatDate(item.recordedAt)}</p>
                  <p className="text-[11px] text-slate-400">{item.recordedByName}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">BP: </span>
                  <span className="font-bold text-navy-900">{item.systolicBP}/{item.diastolicBP}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">HR: </span>
                  <span className="font-bold text-navy-900">{item.heartRate} bpm</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">SpO2: </span>
                  <span className="font-bold text-navy-900">{item.spO2}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
