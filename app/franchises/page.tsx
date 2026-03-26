import FranchisesPage from './ClientFranchises';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Franchise Hub | Discover Premium Business Opportunities',
  description: 'Explore registered franchise brands ready for nationwide expansion. Modernize your portfolio with vetted and scalable business models.',
  alternates: {
    canonical: 'https://nationalfranchiseinvestmentsummit.com/franchises',
  },
  openGraph: {
    title: 'Franchise Hub | Premium Investment Opportunities',
    description: 'Find your perfect franchise match.',
    url: 'https://nationalfranchiseinvestmentsummit.com/franchises', // Use full URL
    type: 'website',
  },
  keywords: ['Franchise Hub', 'Business Opportunities', 'Investment Portfolio', 'Scalable Models', 'Brand Expansion'],
};

export default async function Page() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  let initialFranchises: any[] = [];

  try {
    const res = await fetch(`${API_URL}/api/exhibitor-registrations/`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (res.ok) {
      const data = await res.json();
      const results = data.results || data;

      initialFranchises = (Array.isArray(results) ? results : []).map((item: any) => {
        const investmentStr = item.investment_required || '';
        const minMatch = investmentStr.split('-')[0]?.match(/([\d.]+)\s*(K|Lakh|Crore)/i);
        const maxMatch = investmentStr.split('-')[1]?.match(/([\d.]+)\s*(K|Lakh|Crore)/i);

        const parseVal = (match: any) => {
          if (!match) return 0;
          let val = parseFloat(match[1]);
          const unit = (match[2] || '').toLowerCase();
          if (unit === 'k') val *= 1000;
          else if (unit === 'lakh') val *= 100000;
          else if (unit === 'crore') val *= 10000000;
          return val;
        };

        const minInvest = parseVal(minMatch);
        let maxInvest = parseVal(maxMatch);
        if (minInvest > 0 && maxInvest === 0) maxInvest = minInvest;

        return {
          id: item.id.toString(),
          name: item.company_name || 'Upcoming Franchise',
          categories: (item.industry || 'General').split(/[;,]/).map((s: string) => s.trim()).filter(Boolean),
          investmentRange: {
            min: minInvest,
            max: maxInvest || minInvest * 1.5
          },
          description: item.about || '',
          shortDescription: item.product_category || '',
          roi: item.roi || '18-25',
          yearsInBusiness: Number(item.founded_year) ? new Date().getFullYear() - Number(item.founded_year) : 5,
          unitsOperating: Number(item.units_operating) || 0,
          supportLevel: 'Comprehensive',
          image: item.logo || '',
          highlights: ['Proven Model', 'Training Included', 'Brand Support'],
          verified: item.status === 'paid',
        };
      });
    }
  } catch (err) {
    console.error('Error fetching franchises on server:', err);
  }

  return <FranchisesPage initialFranchises={initialFranchises} />;
}
