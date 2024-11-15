import React from 'woby'
import { $$, ObservableMaybe, useEffect } from 'woby'
import { isTemp } from "./utils"
import { nanoid } from 'nanoid'
import { append } from "./append"

function kf(name?: string, id = false) {
    function keyframes(strings: string,): typeof keyframes //| ((props: JSX.IntrinsicElements[K]) => JSX.IntrinsicElementsMap[K]) 
    function keyframes(strings: TemplateStringsArray, ...values: ObservableMaybe<any>[]): string
    function keyframes(strings: TemplateStringsArray | string, ...values: ObservableMaybe<any>[]): string | typeof keyframes {
        if (isTemp(strings)) {
            const N = name ?? '_' + nanoid(10)
            useEffect(() => {
                const r = `@keyframes ${N} {
${strings.map((str, i) => (i < values.length ? str + $$(values[i]) : str)).join("")}
}`
                return append(<style id={id ? N : undefined}>{r}</style>, document.head)
            })
            return N
        }
        return kf(strings as string)
    }

    return keyframes
}

/** 
 * Convert inline keyframes to class and update <style></style> element
 * should work together with css/styled not tw
 * @example
 * keyframes`
 * from {
 *   transform: scale(0) rotate(45deg);
 * 	opacity: 0;
 * }
 * to {
 *   transform: scale(1) rotate(45deg);
 * 	opacity: 1;
 * }`
 * 
 * Output:
 * hash-name
 * 
 * <head>
 *   <style>
 *   keyframes hash-name {
 *      from {
 *        transform: scale(0) rotate(45deg);
 *      	opacity: 0;
 *      }
 *      to {
 *        transform: scale(1) rotate(45deg);
 *      	opacity: 1;
 *      }
 *   }
 *   </style>
 * <head>
 * <body>
 *   <div style='animation: hash-name 1s'></div>
 * </body>
 */
export const keyframes = kf()
