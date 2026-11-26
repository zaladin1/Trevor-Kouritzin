import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { trackAgentEvent } from '../lib/tracking';

interface SpeciesFactor {
  id: string;
  label: string;
  kmRatio: number;
}

const SPECIES: SpeciesFactor[] = [
  { id: 'mouse', label: 'Mouse', kmRatio: 0.081 },
  { id: 'hamster', label: 'Hamster', kmRatio: 0.135 },
  { id: 'rat', label: 'Rat', kmRatio: 0.162 },
  { id: 'ferret', label: 'Ferret', kmRatio: 0.189 },
  { id: 'guinea-pig', label: 'Guinea Pig', kmRatio: 0.216 },
  { id: 'rabbit', label: 'Rabbit', kmRatio: 0.324 },
  { id: 'monkey', label: 'Monkey (Rhesus)', kmRatio: 0.324 },
  { id: 'dog', label: 'Dog', kmRatio: 0.541 },
];

export default function HedCalculator() {
  const [speciesId, setSpeciesId] = useState<string>('mouse');
  const [animalDoseMgKg, setAnimalDoseMgKg] = useState<string>('50');
  const [humanWeightKg, setHumanWeightKg] = useState<string>('70');

  const activeSpecies = SPECIES.find((s) => s.id === speciesId) || SPECIES[0];
  const parsedDose = Math.max(0, Number.parseFloat(animalDoseMgKg) || 0);
  const parsedHumanWeight = Math.max(1, Number.parseFloat(humanWeightKg) || 70);

  const hedMgKg = parsedDose * activeSpecies.kmRatio;
  const totalHumanMg = hedMgKg * parsedHumanWeight;

  const handleSpeciesChange = (nextId: string) => {
    setSpeciesId(nextId);
    const next = SPECIES.find((s) => s.id === nextId);
    if (next) {
      trackAgentEvent({
        event: 'hed_calculate',
        entityType: 'calculator',
        entityId: 'hed-allometric',
        label: next.label,
        value: Number((parsedDose * next.kmRatio).toFixed(2)),
      });
    }
  };

  const handleReset = () => {
    setSpeciesId('mouse');
    setAnimalDoseMgKg('50');
    setHumanWeightKg('70');
  };

  return (
    <section
      aria-labelledby="hed-calc-heading"
      className="bg-[#F5F4F0] border-y border-[#0B0C0E]/15 py-10 px-6 sm:px-10"
      data-agent-entity="hed-calculator"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#0B0C0E]/15">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold tracking-wide text-[#163A5F]">
            Translational Pharmacology Instrument
          </p>
          <h3 id="hed-calc-heading" className="font-serif text-2xl sm:text-3xl font-semibold text-[#0B0C0E]">
            Human Equivalent Dose (HED) Calculator
          </h3>
          <p className="text-sm text-[#52565E]">
            Allometric body-surface-area scaling via Nair &amp; Jacob (2016) Km ratios.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0B0C0E] border border-[#0B0C0E]/25 bg-white hover:border-[#0B0C0E] transition-colors self-start sm:self-auto whitespace-nowrap shrink-0 min-h-[40px]"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          Reset Example
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-7 items-stretch">
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label htmlFor="hed-species" className="block text-xs font-semibold text-[#0B0C0E] mb-2">
              Preclinical Species
            </label>
            <select
              id="hed-species"
              value={speciesId}
              onChange={(e) => handleSpeciesChange(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-[#0B0C0E]/25 text-sm text-[#0B0C0E] focus:border-[#0B0C0E] focus:outline-none"
            >
              {SPECIES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label} (Km {s.kmRatio})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="hed-animal-dose" className="block text-xs font-semibold text-[#0B0C0E] mb-2">
              Animal Dose (mg/kg)
            </label>
            <input
              id="hed-animal-dose"
              type="number"
              min="0"
              step="0.1"
              value={animalDoseMgKg}
              onChange={(e) => {
                setAnimalDoseMgKg(e.target.value);
                trackAgentEvent({
                  event: 'hed_calculate',
                  entityType: 'calculator',
                  entityId: 'hed-allometric',
                  label: activeSpecies.label,
                });
              }}
              className="w-full h-11 px-3 bg-white border border-[#0B0C0E]/25 text-sm font-mono tabular-nums text-[#0B0C0E] focus:border-[#0B0C0E] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="hed-human-weight" className="block text-xs font-semibold text-[#0B0C0E] mb-2">
              Human Weight (kg)
            </label>
            <input
              id="hed-human-weight"
              type="number"
              min="1"
              step="1"
              value={humanWeightKg}
              onChange={(e) => setHumanWeightKg(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-[#0B0C0E]/25 text-sm font-mono tabular-nums text-[#0B0C0E] focus:border-[#0B0C0E] focus:outline-none"
            />
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#0B0C0E] text-white p-6 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-[#A1A7B3] mb-1">Human Equivalent</p>
            <p className="font-mono text-2xl font-medium text-white tabular-nums">
              {hedMgKg.toFixed(2)} <span className="text-xs text-[#A1A7B3]">mg/kg</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-[#A1A7B3] mb-1">Total ({parsedHumanWeight} kg)</p>
            <p className="font-mono text-2xl font-medium text-white tabular-nums">
              {totalHumanMg.toFixed(1)} <span className="text-xs text-[#A1A7B3]">mg</span>
            </p>
          </div>
          <div className="col-span-2 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-[#A1A7B3] font-mono">
            <span>
              HED = {parsedDose} × {activeSpecies.kmRatio}
            </span>
            <a
              href="/articles/calculating-human-equivalent-dosages-from-animal-studies"
              className="font-sans font-semibold text-white underline underline-offset-4 hover:text-white/80 whitespace-nowrap"
            >
              Read methodology
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
