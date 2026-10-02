import { ActionCard } from './ActionCard';
import type { Action } from '@/lib/content';

type ActionCardGridProps = {
  actions: Action[];
  compact?: boolean;
};

/** Grille responsive des cartes d'action. */
export function ActionCardGrid({ actions, compact = false }: ActionCardGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {actions.map((action, i) => (
        <ActionCard key={action.id} action={action} index={i} compact={compact} />
      ))}
    </div>
  );
}

export default ActionCardGrid;
