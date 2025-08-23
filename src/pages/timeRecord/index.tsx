import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDownIcon, Clock, Pause, Play, Plus, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
//import { finishTimer } from "@/services/dashboardService.ts";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { DataTable } from "@/components/DataTable.tsx";
import type { ColumnDef } from "@tanstack/react-table";

type TimerStatus = "idle" | "running" | "paused";

type Task = {
    project: string;
    activity: string;
    description: string;
    duration: string;
    date: string;
};

function TimeRecordPage() {
    const [status, setStatus] = useState<TimerStatus>("idle");
    const [seconds, setSeconds] = useState(0);
    const [startTime, setStartTime] = useState<Date | null>(null);

    // Timer states
    const [selectedProject, setSelectedProject] = useState<string>("");
    const [selectedActivity, setSelectedActivity] = useState<string>("");
    const [description, setDescription] = useState("");

    // Manual states
    const [manualProject, setManualProject] = useState<string>("");
    const [manualActivity, setManualActivity] = useState<string>("");
    const [manualDescription, setManualDescription] = useState("");
    const [manualDate, setManualDate] = useState<Date | undefined>();
    const [startHour, setStartHour] = useState("");
    const [endHour, setEndHour] = useState("");
    const [open, setOpen] = useState(false);

    // Shared
    const [tasks, setTasks] = useState<Task[]>([]);

    const columns: ColumnDef<Task>[] = [
        { accessorKey: "project", header: "Projeto" },
        { accessorKey: "activity", header: "Atividade" },
        { accessorKey: "description", header: "Descrição" },
        { accessorKey: "duration", header: "Duração" },
        { accessorKey: "date", header: "Data" },
    ];

    const formatTime = (totalSeconds: number) => {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        const secs = String(totalSeconds % 60).padStart(2, "0");
        return `${hours}:${minutes}:${secs}`;
    };

    // ---------------- Timer ----------------
    const handlePlay = () => {
        if (status === "idle") setStartTime(new Date());
        setStatus("running");
    };

    const handlePause = () => setStatus("paused");

    const handleStop = () => {
        if (startTime && selectedProject && selectedActivity) {
            //finishTimer(selectedProject, tasks, description, seconds);
            const newTask: Task = {
                project: selectedProject,
                activity: selectedActivity,
                description,
                duration: formatTime(seconds),
                date: new Date().toISOString().split("T")[0],
            };
            setTasks((prev) => [...prev, newTask]);
        }
        setStatus("idle");
        setSeconds(0);
        setStartTime(null);
        setSelectedProject("");
        setSelectedActivity("");
        setDescription("");
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined;
        if (status === "running") {
            intervalId = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [status]);

    // ---------------- Registro Manual ----------------
    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!manualDate || !startHour || !endHour || !manualProject || !manualActivity) return;

        const [h1, m1, s1] = startHour.split(":").map(Number);
        const [h2, m2, s2] = endHour.split(":").map(Number);

        const start = new Date(manualDate);
        start.setHours(h1, m1, s1 || 0);

        const end = new Date(manualDate);
        end.setHours(h2, m2, s2 || 0);

        const diffSeconds = Math.floor((end.getTime() - start.getTime()) / 1000);

        const newTask: Task = {
            project: manualProject,
            activity: manualActivity,
            description: manualDescription,
            duration: formatTime(diffSeconds),
            date: manualDate.toISOString().split("T")[0],
        };

        setTasks((prev) => [...prev, newTask]);

        // limpa form
        setManualProject("");
        setManualActivity("");
        setManualDescription("");
        setStartHour("");
        setEndHour("");
        setManualDate(undefined);
    };

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <p className="text-2xl font-bold">Registro de Horas</p>
                <p className="text-muted-foreground">Registre e gerencie suas horas trabalhadas</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Timer */}
                <Card className="shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Clock className="h-6 w-6 text-primary" />
                            Timer
                            {status !== "idle" && (
                                <span
                                    className={`ml-2 text-xs px-2 py-1 rounded-full ${
                                        status === "running"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                  {status === "running" ? "Rodando" : "Pausado"}
                </span>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center">
                            <div className="text-5xl font-mono font-bold mb-4">{formatTime(seconds)}</div>
                            <div className="flex justify-center gap-2">
                                {status !== "running" ? (
                                    <Button onClick={handlePlay} className="flex gap-2">
                                        <Play className="h-4 w-4" /> Iniciar
                                    </Button>
                                ) : (
                                    <Button variant="secondary" onClick={handlePause} className="flex gap-2">
                                        <Pause className="h-4 w-4" /> Pausar
                                    </Button>
                                )}
                                <Button
                                    variant="destructive"
                                    className="flex items-center gap-2"
                                    onClick={handleStop}
                                    disabled={status === "idle"}
                                >
                                    <Square className="h-4 w-4" />
                                    <span>Parar</span>
                                </Button>
                            </div>
                        </div>

                        <Separator />
                        <div className="space-y-4 pt-4">
                            <div>
                                <Label>Projeto</Label>
                                <Select onValueChange={setSelectedProject} value={selectedProject}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o Projeto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Projeto A">Projeto A</SelectItem>
                                        <SelectItem value="Projeto B">Projeto B</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Atividade</Label>
                                <Select onValueChange={setSelectedActivity} value={selectedActivity}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione a Atividade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Desenvolvimento">Desenvolvimento</SelectItem>
                                        <SelectItem value="Correção de bugs">Correção de bugs</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="description">Descrição</Label>
                                <Input
                                    id="description"
                                    placeholder="O que você está fazendo?"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Registro manual */}
                <Card className="shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Plus className="h-6 w-6 text-primary" />
                            Registro Manual
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleManualSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label>Data</Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-32 justify-between font-normal">
                                                {manualDate ? manualDate.toLocaleDateString() : "Selecionar data"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={manualDate}
                                                captionLayout="dropdown"
                                                onSelect={(d) => {
                                                    setManualDate(d);
                                                    setOpen(false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Hora Início</Label>
                                    <Input type="time" step="1" value={startHour} onChange={(e) => setStartHour(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Hora Fim</Label>
                                    <Input type="time" step="1" value={endHour} onChange={(e) => setEndHour(e.target.value)} />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div>
                                    <Label>Projeto</Label>
                                    <Select onValueChange={setManualProject} value={manualProject}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o Projeto" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Projeto A">Projeto A</SelectItem>
                                            <SelectItem value="Projeto B">Projeto B</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Atividade</Label>
                                    <Select onValueChange={setManualActivity} value={manualActivity}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a Atividade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Desenvolvimento">Desenvolvimento</SelectItem>
                                            <SelectItem value="Correção de bugs">Correção de bugs</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="manual-description">Descrição</Label>
                                    <Input
                                        id="manual-description"
                                        placeholder="O que você está fazendo?"
                                        value={manualDescription}
                                        onChange={(e) => setManualDescription(e.target.value)}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="flex items-center gap-2 w-full">
                                <Plus className="h-5 w-5" /> Registrar Horas
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Tabela */}
            <div className="mt-10">
                <DataTable columns={columns} data={tasks} />
            </div>
        </div>
    );
}

export default TimeRecordPage;
