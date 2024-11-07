import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Radio, RadioGroup, Snippet } from '@nextui-org/react'
import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react'
import { ColorResult } from 'react-color';
import lib from '../lib';
import AppCheckbox from './AppCheckbox';

type ObjectType = "js" | "nextui";

type ColorModel = 'hex' | 'rgb' | 'hsl';

interface AppGetCodeProps<T> {
    icon: React.ReactNode;
    label: React.ReactNode;
    children?: React.ReactNode;
    heading: React.ReactNode;
    color: ColorResult;
    range: ColorLightRange;
    onCodeCopied: (param: T) => void;
}

type AppGetObjectCodeProps = AppGetCodeProps<ObjectType>;

type AppGetCSSCodeProps = AppGetCodeProps<{
    name: string,
    model: ColorModel,
    isValuesOnly: boolean,
}>;




const AppGetCode = (props: AppGetCodeProps<undefined>) => {
    const [isOpen, setIsOpen] = useState(false);

    const [isDissabled, setIsDissabled] = useState(false);


    function handleCopyCode() {
        if (isDissabled || !props.onCodeCopied) return;

        props.onCodeCopied();

        setIsDissabled(true);

        setTimeout(() => setIsDissabled(false), 3000);
    }

    return (
        <>

            <Button onClick={() => setIsOpen(true)} startContent={props.icon} size="sm">
                {props.label}
            </Button>



            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} scrollBehavior="inside" backdrop="blur">
                <ModalContent>
                    <ModalHeader>{props.heading}</ModalHeader>
                    <ModalBody>
                        {props.children}

                    </ModalBody>
                    <ModalFooter>

                        <Popover
                            style={{ '--nextui-primary': lib.color.hslToString(props.color.hsl) }}
                            classNames={{
                                content: 'border border-primary'
                            }}
                            motionProps={{ initial: { opacity: 1, y: 0 }, animate: { y: -5, opacity: 0, transition: { duration: 3 } } }} isDismissable={false} isOpen={isDissabled}>
                            <PopoverTrigger>
                                <Button
                                    isDisabled={isDissabled}
                                    onClick={handleCopyCode}
                                    fullWidth
                                    size='sm'
                                    style={{
                                        '--bg-color': props.color.hex,
                                        '--fg-color': lib.color.getForeground(props.color.rgb)
                                    }}
                                    className='bg-[var(--bg-color)] text-[var(--fg-color)]'
                                    startContent={<Copy size={16} />}
                                >Copy code</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="flex items-center">
                                    <div className="rounded-full w-4 h-4 me-2 flex items-center justify-center text-white" style={{ backgroundColor: props.color.hex }}>
                                        <Check size={10} className='translate-x-[1px] translate-y-[0px]' />
                                    </div>
                                    <small className='text-sm'>Code copied successfully.</small>
                                </div>
                            </PopoverContent>
                        </Popover>



                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export default AppGetCode;



export const AppGetObjectCode = (props: AppGetObjectCodeProps) => {

    const [type, setType] = useState<ObjectType>("js");

    return (
        <AppGetCode {...props} onCodeCopied={() => props.onCodeCopied(type)}>


            <div className="my-2">
                <RadioGroup style={{ '--nextui-primary': `${props.color.hsl.h} ${props.color.hsl.s} ${props.color.hsl.l}%` }} value={type} onChange={(e) => setType(e.target.value as ObjectType)} orientation="horizontal" size="sm" >
                    <Radio checked name="object-type" value="js" >Javacript</Radio>
                    <Radio name="object-type" value="nextui" >NextUI</Radio>
                </RadioGroup>
            </div>


            <Snippet aria-multiline="true" hideSymbol hideCopyButton>
                <div className="font-bold text-medium">
                    <div>{"{"}</div>
                    {
                        lib.color.forEachShade(props.color, props.range, ({ hex, shadeKey }) => (
                            <div className="ml-6" key={shadeKey}>"{shadeKey}": "{hex}",</div>
                        ))
                    }
                    {
                        type === 'nextui' && (
                            <>
                                <div className="ml-6">"DEFAULT": "{props.color.hex}",</div>
                                <div className="ml-6">"foreground": "{lib.color.getForeground(props.color.rgb)}",</div>
                            </>
                        )
                    }
                    <div>{"}"}</div>
                </div>
            </Snippet>
        </AppGetCode>
    );
};



export const AppGetCSSCode = (props: AppGetCSSCodeProps) => {

    const
        [isValuesOnly, setValuesOnly] = useState(false),

        [model, setModel] = useState<ColorModel>('hex'),

        _valuesOnly = model !== 'hex' && isValuesOnly,
        [name, setName] = useState('primary');

    return (
        <AppGetCode {...props} onCodeCopied={() => props.onCodeCopied({ isValuesOnly, model, name })}>
            <Input variant="bordered" color="default" label="Variable name" value={name} onInput={e => {
                const value = e.target.value.trimStart() as string;
                setName(value.replace(/\s+/, '-').toLowerCase());
            }} labelPlacement="outside" size="sm" placeholder="Enter the CSS variable name here." />

            <div className="my-2 flex items-center justify-between">
                <RadioGroup style={{ '--nextui-primary': `${props.color.hsl.h} ${props.color.hsl.s} ${props.color.hsl.l}%` }} value={model} onChange={(e) => setModel(e.target.value as ColorModel)} orientation="horizontal" size="sm" >
                    <Radio checked name="color-model" value="hex" >Hex</Radio>
                    <Radio name="color-model" value="rgb" >RGB</Radio>
                    <Radio name="color-model" value="hsl" >HSL</Radio>
                </RadioGroup>

                <AppCheckbox color={props.color} checked={_valuesOnly} disabled={model === 'hex'} onChange={setValuesOnly}>
                    <div className="text-sm select-none">Values</div>
                </AppCheckbox>
            </div>
            <Snippet aria-multiline="true" hideSymbol hideCopyButton>
                <div className="font-bold text-medium">
                    {
                        lib.color.forEachShade(props.color, props.range, ({ hex, hsl, shadeKey }) => {
                            if (model === 'hsl') {
                                let
                                    r = (v: number) => v.toPrecision(3),
                                    fn = (o: ColorHSL) => `hsl(${r(o.h)}, ${r(o.s)}%, ${r(o.l)}%)`;

                                if (_valuesOnly) fn = (o: ColorHSL) => `${r(o.h)} ${r(o.s)}% ${r(o.l)}%`;

                                return <div key={shadeKey}>--{name}-{shadeKey}: {fn(hsl)}</div>
                            }
                            if (model === 'rgb') {
                                let fn = (o: ColorRGB) => `rgb(${o.r}, ${o.g}, ${o.b})`;

                                if (_valuesOnly) fn = (o: ColorRGB) => `${o.r} ${o.g} ${o.b}`

                                return <div key={shadeKey}>--{name}-{shadeKey}: {fn(lib.color.hslToRgb(hsl))}</div>
                            }
                            return (
                                <div key={shadeKey}>--{name}-{shadeKey}: {hex};</div>
                            );
                        })
                    }
                </div>
            </Snippet>
        </AppGetCode>
    );
};
