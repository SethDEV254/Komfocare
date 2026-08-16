import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Appointment } from '../../types';
import { apiClient } from '../../api/client';
import { Activity, CheckCircle2, ShieldCheck, User } from 'lucide-react';

interface VisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onSuccess: () => void;
}

export const VisitDocumentationModal: React.FC<VisitModalProps> = ({
  isOpen,
  onClose,
  appointment,
  onSuccess,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    servicesProvided: '',
    clinicalObservations: '',
    patientResponse: 'Patient tolerated procedure well with no adverse reactions reported.',
    followUpRecommendation: 'Continue routine daily recovery plan and keep dressing clean.',
    privateNotes: '',
    // Vitals
    systolicBP: '',
    diastolicBP: '',
    heartRate: '',
    respiratoryRate: '16',
    spO2: '98',
    bloodGlucose: '5.6',
    temperature: '36.6',
  });

  if (!appointment) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      await apiClient('/visits', {
        data: {
          appointmentId: appointment.id,
          patientId: appointment.patientId,
          servicesProvided: formData.servicesProvided || 'Home care visit and clinical review.',
          clinicalObservations: formData.clinicalObservations || 'General condition stable. Vitals logged.',
          patientResponse: formData.patientResponse,
          followUpRecommendation: formData.followUpRecommendation,
          privateNotes: formData.privateNotes,
          vitalSigns: {
            systolicBP: formData.systolicBP ? parseInt(formData.systolicBP, 10) : undefined,
            diastolicBP: formData.diastolicBP ? parseInt(formData.diastolicBP, 10) : undefined,
            heartRate: formData.heartRate ? parseInt(formData.heartRate, 10) : undefined,
            respiratoryRate: formData.respiratoryRate ? parseInt(formData.respiratoryRate, 10) : undefined,
            spO2: formData.spO2 ? parseFloat(formData.spO2) : undefined,
            bloodGlucose: formData.bloodGlucose ? parseFloat(formData.bloodGlucose) : undefined,
            temperature: formData.temperature ? parseFloat(formData.temperature) : undefined,
          },
        },
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit visit notes.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Clinical Visit Documentation"
      subtitle={`Patient: ${appointment.patient?.fullName || 'Patient'} • Service: ${appointment.service?.title}`}
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        {errorMsg && (
          <div className="p-3 bg-rose-50 text-rose-800 rounded-xl border border-rose-200">
            {errorMsg}
          </div>
        )}

        {/* Clinical Services & Observations */}
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Clinical Services Provided *
          </label>
          <textarea
            rows={3}
            required
            placeholder="e.g. Sterile surgical incision redressing, medication compliance check, assisted physical therapy transfer."
            value={formData.servicesProvided}
            onChange={(e) => setFormData({ ...formData, servicesProvided: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-komfo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Clinical Observations & Examination *
          </label>
          <textarea
            rows={3}
            required
            placeholder="e.g. Wound edges well-approximated, no signs of purulent discharge or edema. Patient alert, oriented x3."
            value={formData.clinicalObservations}
            onChange={(e) => setFormData({ ...formData, clinicalObservations: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-komfo-500 focus:outline-none"
          />
        </div>

        {/* Vital Signs Grid */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 font-bold text-navy-900 uppercase tracking-wider text-[11px]">
            <Activity className="w-4 h-4 text-komfo-600" />
            <span>Vital Signs Examination (Optional)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-slate-600 font-medium mb-1">BP (Systolic / Diastolic)</label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  placeholder="120"
                  value={formData.systolicBP}
                  onChange={(e) => setFormData({ ...formData, systolicBP: e.target.value })}
                  className="w-full p-2 bg-white rounded-lg border border-slate-300 text-center"
                />
                <span>/</span>
                <input
                  type="number"
                  placeholder="80"
                  value={formData.diastolicBP}
                  onChange={(e) => setFormData({ ...formData, diastolicBP: e.target.value })}
                  className="w-full p-2 bg-white rounded-lg border border-slate-300 text-center"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">Heart Rate (bpm)</label>
              <input
                type="number"
                placeholder="72"
                value={formData.heartRate}
                onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                className="w-full p-2 bg-white rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">SpO2 (%)</label>
              <input
                type="number"
                step="0.1"
                placeholder="98"
                value={formData.spO2}
                onChange={(e) => setFormData({ ...formData, spO2: e.target.value })}
                className="w-full p-2 bg-white rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">Glucose (mmol/L)</label>
              <input
                type="number"
                step="0.1"
                placeholder="5.6"
                value={formData.bloodGlucose}
                onChange={(e) => setFormData({ ...formData, bloodGlucose: e.target.value })}
                className="w-full p-2 bg-white rounded-lg border border-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Follow-up & Recommendations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Patient Response
            </label>
            <input
              type="text"
              value={formData.patientResponse}
              onChange={(e) => setFormData({ ...formData, patientResponse: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-komfo-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Follow-Up Recommendation
            </label>
            <input
              type="text"
              value={formData.followUpRecommendation}
              onChange={(e) => setFormData({ ...formData, followUpRecommendation: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-komfo-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-navy-900 to-komfo-700 text-white font-bold shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {submitting ? 'Saving Clinical Record...' : 'Complete Visit & Save Notes'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
