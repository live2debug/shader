import { Card, CardBody, CardHeader, Divider, Popover, PopoverContent, PopoverTrigger, Snippet } from "@nextui-org/react";
import { Code, FileJson, Pencil } from "lucide-react";
import { useMemo, useState } from "react";
import { ColorResult } from "react-color";
import { motion } from 'framer-motion';
import AppSlider from "./components/AppSlider";
import AppColorPicker from "./components/AppColorPicker";
import lib from "./lib";
import { DefaultAppLogo } from "./components/AppLogo";
import AppThemeSwitch from "./components/AppThemeSwitch";
import { AppGetCSSCode, AppGetObjectCode } from "./components/AppGetCode";


const DEBOUNCE = 300;

function App() {

  const
    initialColor = useMemo<ColorResult>(() => {
      const
        rand = () => (Math.random() * 150) | 0 + 50,
        rgb = { r: rand(), g: rand(), b: rand() };

      return ({
        rgb,
        hex: lib.color.rgbToHex(rgb),
        hsl: lib.color.rgbToHsl(rgb),
      });
    }, []),

    [color, setColor] = useState<ColorResult>(initialColor),

    [modalOpen, setModalState] = useState(false),

    [isDarkTheme, setDarkTheme] = useState(false),


    [range, setRange] = useState<ColorLightRange>([20, 80]);



  function handleThemeSwitch() {
    const cl = document.body.classList;
    if (isDarkTheme) {
      cl.replace('dark-mode', 'light-mode');
    }
    else {
      cl.replace('light-mode', 'dark-mode');
    }
    setDarkTheme(!isDarkTheme);
  }




  return (
    <div className="select-none m-auto container xl:max-w-[1024px] p-4 poppins-regular overflow-auto h-full flex flex-col">
      <header className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <DefaultAppLogo rgb={color.rgb} /> <div className="ms-2"></div>
          <h1 className={`nanum-gothic-extrabold text-4xl text-[var(--selected-color)]`}>Shader</h1>
        </div>
        <AppThemeSwitch
          color={color}
          isSelected={isDarkTheme}
          onChange={handleThemeSwitch}
        >
        </AppThemeSwitch>
      </header>


      <br />
      <Divider />
      <br />


      <div className="flex justify-center items-center">
        <Popover placement="bottom" shadow="sm" classNames={{
          content: "border-0 outline-0 p-0",
        }}>
          <PopoverTrigger>
            <Card isPressable isHoverable shadow="sm" onClick={() => setModalState(!modalOpen)}>
              <CardBody>
                <div className="flex items-center justify-center">
                  <div style={{ backgroundColor: color?.hex }} className="w-9 aspect-square rounded flex items-center justify-center">
                    <Pencil style={{ color: lib.color.getForeground(color.rgb) }} size={18} />
                  </div>
                  <div className="pl-4">
                    <div className="text-[var(--selected-color)] m-0 p-0">Pick your color</div>
                    <small className="opacity-50 text-xs block">{color.hex}</small>
                  </div>
                </div>
              </CardBody>
            </Card>
          </PopoverTrigger>
          <PopoverContent>
            <AppColorPicker debounce={DEBOUNCE} color={color} onChange={setColor} />
          </PopoverContent>
        </Popover>
      </div>

      <br />
      <br />


      <div className="flex justify-center items-center">
        <AppSlider debounce={DEBOUNCE} min={0} max={100} color={{ ...color }} initialValue={range} onChange={setRange} />
      </div>

      <br />
      <br />


      <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5 gap-4 p-4 bg-background-600 rounded-3xl">
        {lib.color.forEachShade(color, range, ({ shadeKey, hsl, hex, foreground, shadeIndex, totalShade }) => {

          return (
            <motion.div key={`${shadeKey}-${hex}-${range.join(':')}`} animate={{ scale: 1, transition: { delay: (shadeIndex / totalShade) * .15 } }} initial={{ scale: .3 }}>
              <Card style={{ backgroundColor: hex }}>
                <CardHeader><code style={{ color: foreground }}>{shadeKey}</code></CardHeader>
                <CardBody>
                  <Snippet variant="solid" color="default" size="sm" onCopy={() => lib.copyToClipboard(hex)}>
                    {hex}
                  </Snippet>
                </CardBody>
              </Card>
            </motion.div>
          );
        })}
      </div>


      <br />
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-2 gap-3">




          <AppGetObjectCode
            onCodeCopied={(type) => {
              let string = "{\n";
              lib.color.forEachShade(color, range, ({ shadeKey, hex }) => {
                string += `\t"${shadeKey}": "${hex}",\n`;
              });

              if (type === 'nextui') {
                string += `\t"DEFAULT": "${color.hex}",\n`;
                string += `\t"foreground": "${lib.color.getForeground(color.rgb)}",\n`;
              }

              lib.copyToClipboard(string + '}');
            }}
            range={range}
            color={color}
            icon={<Code size={16} />}
            label="Get Object"
            heading={<h6 className="text-sm">Javascript Object</h6>}
          />





          <AppGetCSSCode
            onCodeCopied={({ isValuesOnly, model, name }) => {
              let
                string = "",
                value;

              lib.color.forEachShade(color, range, ({ hex, hsl, shadeKey }) => {
                string += `--${name}-${shadeKey}: `;

                switch (model) {
                  case "hsl":
                    value = lib.color.hslToString(hsl);
                    if (isValuesOnly) string += value;
                    else string += `hsl(${value.split(/\s+/).join(', ')})`;
                    break;
                  case "rgb":
                    value = lib.color.rgbToString(lib.color.hslToRgb(hsl));
                    if (isValuesOnly) string += value;
                    else string += `rgb(${value.split(/\s+/).join(', ')})`;
                    break;

                  default:
                    string += hex;
                }

                string += ';\n';
              });

              lib.copyToClipboard(string);

              console.log(string);
            }}
            range={range}
            color={color}
            icon={<FileJson size={16} />}
            label="Get CSS"
            heading={<h6 className="text-sm">CSS Variables</h6>}
          />
        </div>
      </div>


      <div className="m-auto"></div>

      <div className="flex justify-end items-start opacity-70 text-sm">
        <strong className="opacity-50 font-medium">Desinged by: </strong>
        <a href="tel:+2349021424985" className="font-bold  ml-1 flex flex-col justify-center items-end">
          <strong className="block underline">John Adenyuma</strong>
          <small className="block no-underline text-xs font-normal">
            +234 90 2142 4985
          </small>
        </a>
      </div>
    </div >
  )
}

export default App;
