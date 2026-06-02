"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Building2, CalendarDays } from "lucide-react";

interface WorkHistoryItem {
  period: string;
  role: string;
  company: string;
  description: string;
}

interface WorkHistoryProps {
  workHistory: WorkHistoryItem[];
}

const WorkHistory = ({ workHistory }: WorkHistoryProps) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Work Experience</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          My professional journey in technology and business operations.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {workHistory.map((item, index) => (
          <motion.div
            key={item.role}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-8 relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border -ml-4 hidden md:block">
              <div className="w-3 h-3 rounded-full -ml-[6px] bg-blue-500" />
            </div>

            <Card className="p-6 ml-4 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{item.role}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Building2 className="w-4 h-4" />
                    <span>{item.company}</span>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                  <CalendarDays className="w-4 h-4" />
                  <span>{item.period}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkHistory;
