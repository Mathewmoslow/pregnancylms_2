import React from 'react';
import ContraceptionSelector from './familyplanning/ContraceptionSelector';
import MethodEffectivenessChart from './familyplanning/MethodEffectivenessChart';

const FamilyPlanningMethods = () => (
  <div className="space-y-8">
    <h1 className="text-2xl font-bold">Family Planning</h1>
    <ContraceptionSelector />
    <MethodEffectivenessChart />
  </div>
);

export default FamilyPlanningMethods;
