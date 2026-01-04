"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import {
  Users,
  Award,
  CheckCircle,
  XCircle,
  Eye,
  RotateCcw,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { getTestById } from "@/constants/test-data";

/* ---------- Types ---------- */
interface Participant {
  userId: string;
  name: string;
  email: string;
  score: number;
  status: "PASSED" | "FAILED";
  submittedAt: string;
}

interface TestResult {
  id: string;
  testName: string;
  description: string;
  participants: Participant[];
  stats: {
    totalParticipants: number;
    averageScore: number;
    passed: number;
    failed: number;
  };
}

/* ---------- Animations ---------- */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function AdminTestResultPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TestResult | null>(null);

  /* ---------- CORE LOGIC (STATIC CONSTANT DATA) ---------- */
  const fetchData = () => {
    setLoading(true);

    const testInfo = getTestById(id as string);

    if (!testInfo) {
      setData(null);
      setLoading(false);
      return;
    }

    const participants: Participant[] = testInfo.participants || [];

    const passed = participants.filter(p => p.status === "PASSED").length;
    const failed = participants.filter(p => p.status === "FAILED").length;

    const averageScore =
      participants.length > 0
        ? participants.reduce((sum, p) => sum + p.score, 0) /
        participants.length
        : 0;

    setData({
      id: testInfo.id,
      testName: testInfo.title,
      description: testInfo.description,
      participants,
      stats: {
        totalParticipants: participants.length,
        averageScore,
        passed,
        failed,
      },
    });

    setTimeout(() => setLoading(false), 300);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="container mx-auto p-8 space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!data) return null;

  /* ---------- UI ---------- */
  return (
    <motion.div
      className="container mx-auto p-8 space-y-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-bold">{data.testName}</h1>
        <p className="text-muted-foreground">{data.description}</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Participants" value={data.stats.totalParticipants} icon={<Users />} />
        <StatCard title="Average Score" value={data.stats.averageScore.toFixed(1)} icon={<Award />} />
        <StatCard title="Passed" value={data.stats.passed} icon={<CheckCircle />} />
        <StatCard title="Failed" value={data.stats.failed} icon={<XCircle />} />
      </div>

      <motion.div variants={itemVariants} className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Participant</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.participants.map(p => (
              <TableRow key={p.userId}>
                <TableCell>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.email}</div>
                </TableCell>
                <TableCell>{p.score}</TableCell>
                <TableCell>
                  <Badge variant={p.status === "PASSED" ? "default" : "destructive"}>
                    {p.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(p.submittedAt).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push(`/admin/users/${p.userId}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      router.push(`/admin/tests/${data.id}/submissions/${p.userId}`)
                    }
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Helper ---------- */
function StatCard({ title, value, icon }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
