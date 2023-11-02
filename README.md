# woby-styled

Styled/css library designed for Voby

- **styled** - Convert inline css style to class and update \<style\>\</style> elements.
- **css** - Easily change default settings via props
- **tw** - Align your tooltip to your
- **keyframes** - Align your tooltip to your
- Tailwind CSS

This library inspired by styled-component, @emotion and supoort Tailwind Css

## Installation

### NPM

```bash
pnpm add woby-styled
```

## Usage

## Classed Styles - styled()
Convert inline css style to class and update \<style\>\</style> elements.
 
@returns hashed CSS class name

```tsx
 const color = ${'red'}
 <div class={styled`color:${color};`}></div>
```

Output:  

```html
 <head>
   <style>
   .hash-name {
     color:red;
   }
   </style>
 <head>
 <body>
   <div class='hash-name'></div>
 </body>
```
 
Updating \<style> in head and prepend className into ND component.
```tsx
 const ND = cls('div')`color:${color};`
```

**Note**: styled method apply to class or className attribute

## Stringed Styles - css()

Convert inline css style to HTMLElement style string.
 
 ```tsx
 const color = ${'red'}
 <div style={css`color:${color};`}></div>
 ```
   
 Output: 
 ```html
<div style='color:red;'></div>
```
 
 ```tsx
 const ND = css('div')`color:blue;`
 ```

 Output:
 ```html
 <ND>blue color text here in a div container</ND>
 ```
**Note**: css method apply to style attribute
Only string styles css is supported to reduce libarary size.
Object bases css (CSSProperties) may or may not be implemented.

## Tailwind Styles - tw()

Like styled() but this classes created in \<style>\</style>

Inline tailwind css style to element class
```tsx
const color = ${'text-[red]'}
<div class={tw`absolute font-bold ${color}`}></div>
```

Output:
```html
<div class='absolute font-bold text-red'></div>
```

```tsx
const ND = tw('div')`text-red`
```
Prepend 'text-red' as className into ND component.

## Keyframes - keyframes()

 Convert inline keyframes to class and update <style></style> element
 
 **Should** work together with css()/styled() not tw()
 
 ```tsx
 const className = keyframes`
 from {
   transform: scale(0) rotate(45deg);
 	opacity: 0;
 }
 to {
   transform: scale(1) rotate(45deg);
 	opacity: 1;
 }`
``` 
 
Output:
```html
 <head>
   <style>
    keyframes hash-name {
        from {
            transform: scale(0) rotate(45deg);
            opacity: 0;
        }
        to {
            transform: scale(1) rotate(45deg);
            opacity: 1;
        }
    }
   </style>
 <head>
 <body>
   <div style='animation: hash-name 1s'></div>
 </body>
```

## License

MIT