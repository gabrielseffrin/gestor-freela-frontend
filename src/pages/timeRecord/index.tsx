import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDownIcon, Clock, Pause, Play, Plus, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { finishTimer } from "@/services/dashboardService.ts";
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

type TimerStatus = "idle" | "running" | "paused";

function TimeRecordPage() {
    const [status, setStatus] = useState<TimerStatus>("idle");
    const [seconds, setSeconds] = useState(0);
    const [startTime, setStartTime] = useState<Date | null>(null);

    const [selectedProject, setSelectedProject] = useState(0);
    const [tasks, setTasks] = useState("");
    const [description, setDescription] = useState("");

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);

    const formatTime = (totalSeconds: number) => {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
            2,
            "0"
        );
        const secs = String(totalSeconds % 60).padStart(2, "0");
        return `${hours}:${minutes}:${secs}`;
    };

    const handlePlay = () => {
        if (status === "idle") setStartTime(new Date());
        setStatus("running");
    };

    const handlePause = () => setStatus("paused");

    const handleStop = () => {
        if (startTime) {
            finishTimer(selectedProject, tasks, description, seconds);
        }
        setStatus("idle");
        setSeconds(0);
        setStartTime(null);
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (status === "running") {
            intervalId = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [status]);

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <p className="text-2xl font-bold">Registro de Horas</p>
                <p className="text-muted-foreground">
                    Registre e gerencie suas horas trabalhadas
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* card para registro via timer */}
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
                            <div className="text-5xl font-mono font-bold mb-4">
                                {formatTime(seconds)}
                            </div>
                            <div className="flex justify-center gap-2">
                                {status !== "running" ? (
                                    <Button onClick={handlePlay} className="flex gap-2">
                                        <Play className="h-4 w-4" /> Iniciar
                                    </Button>
                                ) : (
                                    <Button
                                        variant="secondary"
                                        onClick={handlePause}
                                        className="flex gap-2"
                                    >
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
                                <Label className="mb-2">Projeto</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder={"Selecione o Projeto"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Projeto A</SelectItem>
                                        <SelectItem value="2">Projeto B</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="mb-2">Atividade</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder={"Selecione a Atividade"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Desenvolvimento</SelectItem>
                                        <SelectItem value="2">Correção de bugs</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor={"description"}>Descrição</Label>
                                <Input
                                    id={"description"}
                                    placeholder={"O que você está fazendo?"}
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* card para registro manual */}
                <Card className="shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Plus className="h-6 w-6 text-primary" />
                            Registro Manual
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="date-picker">Data</Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date-picker"
                                                className="w-32 justify-between font-normal"
                                            >
                                                {date ? date.toLocaleDateString() : "Selecionar data"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                captionLayout="dropdown"
                                                onSelect={(date) => {
                                                    setDate(date);
                                                    setOpen(false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="time-picker-start">Hora Início</Label>
                                    <Input type="time" id="time-picker-start" step="1" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="time-picker-end">Hora Fim</Label>
                                    <Input type="time" id="time-picker-end" step="1" />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div>
                                    <Label className="mb-2">Projeto</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder={"Selecione o Projeto"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Projeto A</SelectItem>
                                            <SelectItem value="2">Projeto B</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="mb-2">Atividade</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder={"Selecione a Atividade"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Desenvolvimento</SelectItem>
                                            <SelectItem value="2">Correção de bugs</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor={"description"}>Descrição</Label>
                                    <Input
                                        id={"description"}
                                        placeholder={"O que você está fazendo?"}
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                </div>
                            </div>

                            <Button className="flex items-center gap-2 w-full">
                                <Plus className="h-5 w-5" />
                                Registrar Horas
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default TimeRecordPage;
