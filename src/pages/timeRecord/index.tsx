import React, {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Clock, Pause, Play, Plus, Square} from "lucide-react";
import {Button} from "@/components/ui/button";
import {finishTimer} from "@/services/dashboardService.ts";
import {Select} from "@radix-ui/react-select";
import {SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Input} from "@/components/ui/input.tsx";

type TimerStatus = "idle" | "running" | "paused";

function TimeRecordPage() {
    const [status, setStatus] = useState<TimerStatus>("idle");
    const [seconds, setSeconds] = useState(0);
    const [startTime, setStartTime] = useState<Date | null>(null);

    const [selectedProject, setSelectedProject] = useState(0);
    const [tasks, setTasks] = useState("");
    const [description, setDescription] = useState("");


    const formatTime = (totalSeconds: number) => {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        const secs = String(totalSeconds % 60).padStart(2, "0");
        return `${hours}:${minutes}:${secs}`;
    };

    const handlePlayPause = () => {
        if (status === "idle") {
            setStatus("running");
            setStartTime(new Date());
        } else if (status === "running") {
            setStatus("paused");
        } else if (status === "paused") {
            setStatus("running");
        }
    };

    const handleStop = () => {
        console.log(`Timer parado. Início: ${startTime}, Duração: ${seconds}s`);
        setStatus("idle");

        finishTimer(0, "teste", "descricao", seconds);


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
                <p className="text-2xl font-semibold">Registro de Horas</p>
                <p className="text-muted-foreground">Registre e gerencie suas horas trabalhadas</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5"/>
                            Timer
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className={"text-center"}>
                            <div className="text-4xl font-mono font-bold mb-4">
                                {formatTime(seconds)}
                            </div>
                            <div className="flex justify-center gap-2">
                                <Button
                                    className="flex items-center gap-2"
                                    onClick={handlePlayPause}
                                >
                                    {status === "running" ? (
                                        <>
                                            <Pause className="h-4 w-4"/>
                                            <span>Pause</span>
                                        </>
                                    ) : (
                                        <>
                                            <Play className="h-4 w-4"/>
                                            <span>Play</span>
                                        </>
                                    )}
                                </Button>

                                <Button
                                    variant="destructive"
                                    className="flex items-center gap-2"
                                    onClick={handleStop}
                                    disabled={status === "idle"}
                                >
                                    <Square className="h-4 w-4"/>
                                    <span>Stop</span>
                                </Button>
                            </div>
                        </div>
                        <div className={"space-y-4 pt-4 border-t"}>
                            <div>
                                <label className={"mb-3"}>Projeto</label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder={'Selecione o Projeto'}/>
                                    </SelectTrigger>
                                </Select>
                            </div>
                            <div>
                                <label className="mb-3">Atividade</label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder={'Selecione o Atividade'}/>
                                    </SelectTrigger>
                                </Select>
                            </div>

                            <div>
                                <label id={'description'}>Adicione uma descrição</label>
                                <Input
                                    id={'description'}
                                    placeholder={"O que voce está fazendo?"}
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                >

                                </Input>
                            </div>

                        </div>

                    </CardContent>


                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="h-5 w-5"/>
                            Registro Manual
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        sdss
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default TimeRecordPage;
