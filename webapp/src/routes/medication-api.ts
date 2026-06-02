import { Hono } from 'hono'

export const medicationApi = new Hono()

// Simple drug interaction awareness data (informational only)
const knownInteractions: Record<string, string[]> = {
  'warfarin': ['aspirin', 'ibuprofen', 'naproxen', 'vitamin k', 'fish oil'],
  'aspirin': ['warfarin', 'ibuprofen', 'naproxen', 'clopidogrel'],
  'ibuprofen': ['warfarin', 'aspirin', 'lisinopril', 'metformin', 'naproxen'],
  'lisinopril': ['ibuprofen', 'potassium', 'spironolactone'],
  'metformin': ['ibuprofen', 'alcohol'],
  'simvastatin': ['grapefruit', 'niacin', 'cyclosporine'],
  'metoprolol': ['verapamil', 'diltiazem', 'clonidine'],
  'levothyroxine': ['calcium', 'iron', 'antacids'],
  'sertraline': ['tramadol', 'linezolid', 'monoamine oxidase inhibitors'],
  'clopidogrel': ['aspirin', 'ibuprofen', 'omeprazole'],
  'omeprazole': ['clopidogrel', 'methotrexate'],
  'amlodipine': ['simvastatin', 'grapefruit']
}

medicationApi.post('/check-interactions', async (c) => {
  const { medications } = await c.req.json()
  
  if (!Array.isArray(medications)) {
    return c.json({ error: 'Invalid input' }, 400)
  }
  
  const warnings: Array<{ drug1: string, drug2: string, severity: string, note: string }> = []
  
  const medNames = medications.map((m: any) => m.name?.toLowerCase() || '')
  
  for (let i = 0; i < medNames.length; i++) {
    const med = medNames[i]
    const interactions = knownInteractions[med] || []
    
    for (const interactingDrug of interactions) {
      const foundIndex = medNames.findIndex((m, idx) => idx !== i && m.includes(interactingDrug))
      if (foundIndex !== -1) {
        const already = warnings.find(w => 
          (w.drug1 === med && w.drug2 === medNames[foundIndex]) ||
          (w.drug1 === medNames[foundIndex] && w.drug2 === med)
        )
        if (!already) {
          warnings.push({
            drug1: medications[i].name,
            drug2: medications[foundIndex].name,
            severity: 'moderate',
            note: 'Potential interaction identified — discuss with your pharmacist or physician.'
          })
        }
      }
    }
  }
  
  return c.json({ 
    warnings,
    disclaimer: 'This interaction check is for informational purposes only and does not replace professional medical advice. Always consult your pharmacist or physician before changing your medications.'
  })
})

medicationApi.get('/categories', (c) => {
  return c.json({
    categories: [
      'Heart / Blood Pressure',
      'Diabetes', 
      'Cholesterol',
      'Blood Thinner',
      'Pain Relief',
      'Thyroid',
      'Mental Health',
      'Respiratory',
      'Vitamin / Supplement',
      'Other'
    ]
  })
})
