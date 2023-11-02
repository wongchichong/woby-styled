import { $$, JSX, ObservableMaybe, ObservableReadonly, useEffect } from 'woby'
import { extract, isTemp } from "./utils"
import { nanoid } from 'nanoid'
import { append } from "./append"

function Styled<K extends keyof JSX.IntrinsicElementsMap>(comp?: K) {
    function styled<K extends (keyof JSX.IntrinsicElementsMap | TemplateStringsArray)>(strings: K, ...values: ObservableMaybe<any>[]):
        K extends keyof JSX.IntrinsicElementsMap ? ((strings: TemplateStringsArray, ...values: ObservableMaybe<any>[]) => ((props: JSX.IntrinsicElements[K]) => JSX.IntrinsicElementsMap[K])) : ObservableReadonly<string> {
        if (isTemp(strings)) {
            const C = comp
            const N = '_' + nanoid(10)
            useEffect(() => {
                const r = `.${N} {
${strings.map((str, i) => (i < values.length ? str + $$(values[i]) : str)).join("")}
}`
                return append(<style id={N}>{r}</style>, document.head)
            })

            return (C ? props => extract(C, props, N) : N) as any
        }

        return Styled(strings).styled as any
    }

    return { comp, styled }
}

/** convert inline css to class and update <style></style> element
 * 
 * @example
 * const color = ${'red'}
 * <div class={cls`color:${color};`}></div>
 * 
 * Output:  
 * <head>
 *   <style>
 *   .hash-name {
 *     color:red;
 *   }
 *   </style>
 * <head>
 * <body>
 *   <div class='hash-name'></div>
 * </body>
 * 
 * @example
 * const ND = cls('div')`color:${color};`
 * 
 * Updating <style> in head and prepend className into ND component.
 */
export const styled = Styled().styled
