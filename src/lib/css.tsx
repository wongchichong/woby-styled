import { $$, ObservableMaybe, useMemo, ObservableReadonly, type JSX } from "voby"
import { isTemp } from "./utils"

function style<K extends keyof JSX.IntrinsicElementsMap>(comp?: K) {
    function css<K extends (keyof JSX.IntrinsicElementsMap | TemplateStringsArray)>(strings: K, ...values: ObservableMaybe<any>[]):
        K extends keyof JSX.IntrinsicElementsMap ? ((strings: TemplateStringsArray, ...values: ObservableMaybe<any>[]) => ((props: JSX.IntrinsicElements[K]) => JSX.IntrinsicElementsMap[K])) : ObservableReadonly<string> {
        if (isTemp(strings)) {
            const C = comp
            const r = useMemo(() => strings.map((str, i) => (i < values.length ? str + $$(values[i]) : str)).join(""))
            return (C ? props => <C style={r} {...props}></C> : r) as any
        }

        return style(strings).css as any
    }

    return { comp, css }
}

/** 
 * Convert inline css style to HTMLElement style string.
 * @example
 * const color = ${'red'}
 * <div style={css`color:${color};`}></div>
 *  
 * Output: 
 *   <div style='color:red;'></div>
 * 
 * @example
 * const ND = css('div')`color:blue;`
 * 
 * Output:
 *   <ND>blue color text here in a div container</ND>
 */
export const css = style().css
