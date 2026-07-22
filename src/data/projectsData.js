// Broadcasting images for Gate House & Perimeter Fence project
export const broadcastingImages = [
  '/Broadcasting1.jpeg',
  '/Broadcasting2.jpeg',
  '/Broadcasting3.jpeg',
  '/Broadcasting4.jpeg',
  '/Broadcasting5.jpeg',
  '/Broadcasting6.jpeg',
  '/Broadcasting7.jpeg',
  '/Broadcasting8.jpeg',
  '/Broadcasting10.jpeg',
  '/Broadcasting11.jpeg',
  '/Broadcasting12.jpeg',
  '/Broadcasting13.jpeg',
  '/Broadcasting14.jpeg',
  '/Broadcasting15.jpeg',
  '/Broadcasting16.jpeg',
  '/Broadcasting17.jpeg',
  '/Broadcasting19.jpeg',
  '/Broadcasting20.jpeg',
  '/Broadcasting21.jpeg',
  '/Broadcasting22.jpeg',
  '/Broadcasting23.jpeg',
  '/Broadcasting24.jpeg',
  '/Broadcasting25.jpeg',
  '/Broadcasting26.jpeg',
];

// Iwo 4-Bedroom Apartment project images
export const iwoImages = [
  '/iwo.jpeg',
  '/iwo2.jpeg',
  '/iwo3.jpeg',
  '/iwo4.jpeg',
  '/iwo5.jpeg',
  '/iwo6.jpeg',
  '/iwo7.jpeg',
  '/iwo8.jpeg',
  '/iwo9.jpeg',
  '/iwo10.jpeg',
  '/iwo12.jpeg',
  '/iwo13.jpeg',
  '/iwo14.jpeg',
  '/iwo15.jpeg',
  '/iwo16.jpeg',
  '/iwo17.jpeg',
  '/iwo18.jpeg',
  '/iwo19.jpeg',
  '/iwo20.jpeg',
];

export const projects = [
  {
    id: 'proj-1',
    number: '01',
    title: 'Construction of 4-Bedroom Apartment',
    shortTitle: '4-Bedroom Apartment',
    location: 'Iwo, Osun State',
    client: 'Mr. Ogundapo Olalekan',
    value: '₦45,000,000',
    duration: '18 months',
    status: 'COMPLETED',
    year: '2024',
    category: 'Residential Construction',
    scope:
      'Full construction of a luxury 4-bedroom apartment including structural works, finishes, MEP installations, external landscaping, and boundary fencing.',
    processNote:
      'The images below document the building construction process — from foundation and blockwork to structural slab, roof completion, and final finishes of the 4-Bedroom Apartment.',
    images: iwoImages,
  },
  {
    id: 'proj-2',
    number: '02',
    title: 'Construction of Gate House & Perimeter Fence',
    shortTitle: 'Gate House & Fence',
    location: 'Ibadan, Oyo State',
    client: 'Broadcasting Corporation of Oyo State',
    value: '₦15,000,000',
    duration: '4 months',
    status: 'COMPLETED',
    year: '2024',
    category: 'Government / Public Infrastructure',
    scope:
      'Design and construction of a modern gate house facility and perimeter fence for the Broadcasting Corporation of Oyo State headquarters, including security provisions.',
    processNote:
      'The images below document the building construction process — from foundation trenching, block walling, concrete columns, gate installation, and security perimeter finishing.',
    images: broadcastingImages,
  },
];

export function getProjectById(id) {
  if (!id) return null;
  return projects.find((p) => p.id.toLowerCase() === id.toLowerCase()) || null;
}
