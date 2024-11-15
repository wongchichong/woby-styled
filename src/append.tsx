import { $$, useEffect, type JSX } from 'woby'

export const append = (child: JSX.Child | HTMLElement, parent: JSX.Child): (() => void) => {
    return useEffect(() => {
        const [c, p] = [$$($$(child)), $$($$(parent))] as [HTMLElement, HTMLElement]
        p.appendChild(c)

        const um = () => p.removeChild(c)
        return um
    })
}