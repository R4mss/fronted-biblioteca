import React, { useEffect, useState, useRef } from "react";
import StepModelNew from "./Componente/StepModelNew";

type Step = {
    id: number;
    description: string;
    completed: boolean;
    highlighted: boolean;
    selected: boolean;
};

type StepperProps = {
    steps: string[];
    currentStep: number;
    estadoModel: boolean[];
};

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, estadoModel }) => {
    const [newStep, setNewStep] = useState<Step[]>([]);
    const stepRef = useRef<Step[]>([]);

    const updateStep = (stepNumber: number, steps: Step[]): Step[] => {
        const newSteps = [...steps];

        let count = 0;

        while (count < newSteps.length) {
            if (count === stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: true,
                    selected: true,
                    completed: true,
                };
                count++;
            } else if (count < stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: true,
                    completed: true,
                };
                count++;
            } else {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: false,
                    completed: false,
                };
                count++;
            }
        }
        return newSteps;
    };

    useEffect(() => {
        const stepsStatePrueba: Step[] = [];

        for (let i = 0; i < steps.length; i++) {
            stepsStatePrueba.push({
                id: i + 1,
                description: steps[i],
                completed: false,
                highlighted: i === 0,
                selected: i === 0,
            });
        }

        stepRef.current = stepsStatePrueba;

        const current = updateStep(currentStep - 1, stepRef.current);

        setNewStep(current);
    }, [steps, currentStep]);

    const displaySteps = newStep.map((step, index) => (
        <div key={step.id} className={step.id > 1 ? "w-full" : ""}>
            <StepModelNew index={index} step={step} estado={estadoModel} />
        </div>
    ));

    return (
        <div className="mx-auto my-5 p-8 flex justify-between items-center w-11/12">
            {displaySteps}
        </div>
    );
};

export default Stepper;