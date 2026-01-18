import { Package, ArrowUpRight, Clock } from "lucide-react";

const RecentTransactions = () => {
  const transactions = [
    {
      id: 1,
      icon: Package,
      title: "5 batch deliveries",
      time: "Today | 2:31 pm • 18.7 mi",
      amount: "+ $79.90",
      tip: "+ $21.10 tips",
    },
    {
      id: 2,
      icon: Package,
      title: "3 batch deliveries",
      time: "Yesterday | 4:15 pm • 12.3 mi",
      amount: "+ $52.40",
      tip: "+ $15.60 tips",
    },
    {
      id: 3,
      icon: Package,
      title: "7 batch deliveries",
      time: "Dec 15 | 1:20 pm • 24.5 mi",
      amount: "+ $98.20",
      tip: "+ $28.80 tips",
    },
  ];

  return (
    <div className="mt-8 pb-24 bg-black">
      <h2 className="text-base font-bold text-white mb-4 px-4 tracking-tight">Recent Transactions</h2>
      <div className="space-y-3 px-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/10">
                <transaction.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">{transaction.title}</h3>
                <p className="text-[10px] text-zinc-500 mt-0.5">{transaction.time}</p>
              </div>
              <div className="text-right">
                <p className="text-base font-medium text-white">{transaction.amount}</p>
                <p className="text-[10px] font-medium text-emerald-400">{transaction.tip}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
