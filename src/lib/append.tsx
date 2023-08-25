import { Child, $$, useEffect } from "voby"

export const append = (child: Child, parent: Child): (() => void) => {
    return useEffect(() => {
        const [c, p] = [$$($$(child)), $$($$(parent))] as [HTMLElement, HTMLElement]
        p.appendChild(c)

        const um = () => p.removeChild(c)
        return um
    })
}