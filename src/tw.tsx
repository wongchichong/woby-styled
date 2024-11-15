import { $$, ObservableMaybe, useMemo, ObservableReadonly, type JSX } from 'woby'

import { extract, isTemp } from "./utils"

function style<K extends keyof JSX.IntrinsicElementsMap>(comp?: K) {
    function tw<K extends (keyof JSX.IntrinsicElementsMap | TemplateStringsArray)>(strings: K, ...values: ObservableMaybe<any>[]):
        K extends keyof JSX.IntrinsicElementsMap ? ((strings: TemplateStringsArray, ...values: ObservableMaybe<any>[]) => ((props: JSX.IntrinsicElements[K]) => JSX.IntrinsicElementsMap[K])) : ObservableReadonly<string> {
        if (isTemp(strings)) {
            const C = comp
            const r = useMemo(() => strings.map((str, i) => (i < values.length ? str + $$(values[i]) : str)).join(""))
            return (C ? props => extract(C as any, props, r) : r) as any
        }

        return style(strings).tw as any
    }

    return { comp, tw }
}

/** Inline tailwind css style to element class
 * @example
 * const color = ${'text-[red]'}
 * <div class={tw`absolute font-bold ${color}`}></div>
 *  
 * Output:  * 
 *   <div class='absolute font-bold text-red'></div>
 * 
 * @example
 * const ND = tw('div')`text-red`
 * 
 * Prepend 'text-red' as className into ND component.
 */
export const tw = style().tw
