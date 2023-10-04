import { ObservableMaybe, type JSX } from 'voby'

export const isTemp = (s: any): s is TemplateStringsArray => !!s.raw

export const extract = <K extends keyof JSX.IntrinsicElementsMap>(C: K, props: JSX.IntrinsicElements[K], classNames?: ObservableMaybe<JSX.Class>): JSX.IntrinsicElementsMap[K] => {
    const { className, ...p } = props
    const cls = p.class
    delete p.class
    return <C class={[classNames, cls, className]} {...p}></C>
}