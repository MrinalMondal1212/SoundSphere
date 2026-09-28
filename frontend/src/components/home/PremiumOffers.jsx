import { Check } from 'lucide-react'

// TODO: Plans can be fetched from /api/plans or kept static
const plans = [
  {
    id: 'pro',
    name: 'Pro',
    price: '9.99',
    period: 'mo',
    description: 'Perfect for dedicated music lovers who want the full experience with zero limits.',
    features: [
      'Unlimited song downloads',
      'Ad-free listening',
      'High-quality audio (320kbps)',
      'Offline mode',
      'Priority support',
      'Early access to new features',
    ],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    id: 'basic',
    name: 'Basic',
    price: '4.99',
    period: 'mo',
    description: 'Great for casual listeners who want more control over their music.',
    features: [
      '50 song downloads / month',
      'Ad-free listening',
      'Standard audio quality',
      'Offline mode',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    id: 'free',
    name: 'Free',
    price: '0',
    period: 'mo',
    description: 'Start your music journey at no cost — no card required.',
    features: [
      'Stream with ads',
      'Limited skips per hour',
    ],
    cta: 'Join Free',
    highlighted: false,
  },
]

// ─── Plan Card ────────────────────────────────────────────────────────────────

const PlanCard = ({ plan }) => (
  <div
    className={`relative flex flex-col rounded-2xl p-6 transition-all duration-200 ${
      plan.highlighted
        ? 'bg-gradient-to-b from-primary/20 via-primary/10 to-primary/5 border-2 border-primary shadow-xl shadow-primary/20'
        : 'bg-card border border-border hover:border-primary/40'
    }`}
  >
    {/* Popular badge */}
    {plan.highlighted && (
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-primary/40">
        Most Popular
      </div>
    )}

    {/* Plan Name */}
    <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? 'text-primary' : 'text-text'}`}>
      {plan.name}
    </h3>

    {/* Description */}
    <p className="text-text-secondary text-xs leading-relaxed mb-5">{plan.description}</p>

    {/* Feature List */}
    <ul className="flex flex-col gap-3 mb-6 flex-1">
      {plan.features.map((feature) => (
        <li key={feature} className="flex items-center gap-2.5">
          <div
            className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
              plan.highlighted ? 'bg-primary' : 'bg-border'
            }`}
          >
            <Check size={10} className="text-white" strokeWidth={3} />
          </div>
          <span className="text-text-secondary text-xs">{feature}</span>
        </li>
      ))}
    </ul>

    {/* Price */}
    <div className="mb-5">
      <span className="text-4xl font-bold text-text">${plan.price}</span>
      <span className="text-text-muted text-sm"> /{plan.period}</span>
    </div>

    {/* CTA Button */}
    {/* TODO: Connect to /api/subscriptions to upgrade plan */}
    <button
      className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
        plan.highlighted
          ? 'bg-primary hover:bg-primary-hover text-white shadow-md shadow-primary/30 hover:shadow-primary/50'
          : 'border border-primary text-primary hover:bg-primary hover:text-white'
      }`}
    >
      {plan.cta}
    </button>
  </div>
)

// ─── Section ─────────────────────────────────────────────────────────────────

const PremiumOffers = () => (
  <section className="mt-14">
    <h2 className="text-base font-bold text-text text-center mb-10">
      Our <span className="text-primary">Premium</span> Offers
    </h2>
    <div className="grid grid-cols-3 gap-6">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  </section>
)

export default PremiumOffers
