import type React from 'react'
import { useEffect, useId, useState } from 'react'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockShiki from 'tiptap-extension-code-block-shiki'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  Redo2,
  UnderlineIcon,
  Undo2,
  Unlink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FieldWrapper } from '@/components/forms/field-wrapper'
import { SHIKI_THEMES } from '@/lib/shiki/config'
import { cn } from '@/lib/utils'

export interface EditorProps {
  label?: string
  hint?: string
  error?: string
  name?: string
  value: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
  variant?: 'default' | 'compact'
  onChange?: (e: { target: { name: string; value: string }; persist: () => void }) => void
}

function getExtensions(placeholder: string) {
  return [
    StarterKit.configure({
      heading: {
        levels: [2, 3],
      },
      codeBlock: false,
    }),
    CodeBlockShiki.configure({
      defaultTheme: SHIKI_THEMES.dark,
      themes: SHIKI_THEMES,
      defaultLanguage: null,
      HTMLAttributes: {
        class: 'qwerty-code-block',
      },
    }),
    Underline,
    Highlight.configure({ multicolor: false }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Link.configure({
      openOnClick: false,
      autolink: true,
      defaultProtocol: 'https',
      HTMLAttributes: {
        rel: 'noopener noreferrer nofollow',
        target: '_blank',
      },
    }),
    Placeholder.configure({
      placeholder,
    }),
  ]
}

function ToolbarButton({
  active,
  label,
  children,
  onClick,
  disabled,
}: {
  active?: boolean
  label: string
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      aria-pressed={active}
      title={label}
      disabled={disabled}
      className={cn(
        'shrink-0',
        active &&
          'bg-primary/15 text-primary shadow-none hover:bg-primary/20 hover:text-primary',
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export function Editor({
  label,
  hint,
  error,
  name = '',
  value,
  placeholder = 'Write your content...',
  disabled = false,
  required = false,
  className,
  variant = 'default',
  onChange,
}: EditorProps) {
  const generatedId = useId()
  const id = name || generatedId
  const [, setLinkUrl] = useState('')

  const editor = useEditor({
    extensions: getExtensions(placeholder),
    content: value,
    editable: !disabled,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        id,
        'data-placeholder': placeholder,
        'aria-invalid': error ? 'true' : 'false',
        'aria-required': required ? 'true' : 'false',
        'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : '',
        class:
          variant === 'compact'
            ? 'tiptap qwerty-editor min-h-[140px] w-full min-w-0 px-3 py-2 outline-none focus-visible:outline-none'
            : 'tiptap qwerty-editor min-h-[320px] w-full min-w-0 px-3 py-2 outline-none focus-visible:outline-none',
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange?.({
        target: {
          name,
          value: currentEditor.isEmpty ? '' : currentEditor.getHTML(),
        },
        persist: () => {},
      })
    },
  })

  const [, setToolbarRevision] = useState(0)

  useEffect(() => {
    if (!editor) return

    const syncToolbar = () => setToolbarRevision((revision) => revision + 1)

    editor.on('selectionUpdate', syncToolbar)
    editor.on('transaction', syncToolbar)

    return () => {
      editor.off('selectionUpdate', syncToolbar)
      editor.off('transaction', syncToolbar)
    }
  }, [editor])

  const setLink = () => {
    if (!editor) return

    const previousUrl = editor.getAttributes('link').href ?? ''
    const url = window.prompt('Link URL', previousUrl)

    if (url === null) return

    if (!url.trim()) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      setLinkUrl('')
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run()
    setLinkUrl(url.trim())
  }

  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error} disabled={disabled}>
      <div
        className={cn(
          'min-w-0 overflow-hidden rounded-lg border border-border bg-muted text-foreground transition-all focus-within:border-ring focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background',
          error &&
            'border-destructive focus-within:border-destructive focus-within:ring-destructive',
          className,
        )}
      >
        <div className="flex w-full min-w-0 items-center gap-1.5 overflow-x-auto border-b border-border bg-card/70 p-1.5">
          <ToolbarButton
            label="Undo"
            disabled={!editor?.can().undo()}
            onClick={() => editor?.chain().focus().undo().run()}
          >
            <Undo2 />
          </ToolbarButton>
          <ToolbarButton
            label="Redo"
            disabled={!editor?.can().redo()}
            onClick={() => editor?.chain().focus().redo().run()}
          >
            <Redo2 />
          </ToolbarButton>
          <span className="mx-1 h-6 w-px shrink-0 bg-border" />
          <ToolbarButton
            active={editor?.isActive('bold')}
            label="Bold"
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <Bold />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive('italic')}
            label="Italic"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <Italic />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive('underline')}
            label="Underline"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive('highlight')}
            label="Highlight"
            onClick={() => editor?.chain().focus().toggleHighlight().run()}
          >
            <Highlighter />
          </ToolbarButton>
          <span className="mx-1 h-6 w-px shrink-0 bg-border" />
          <ToolbarButton
            active={editor?.isActive('paragraph')}
            label="Paragraph"
            onClick={() => editor?.chain().focus().setParagraph().run()}
          >
            <Pilcrow />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive('heading', { level: 2 })}
            label="Heading 2"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive('heading', { level: 3 })}
            label="Heading 3"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <Heading3 />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive('bulletList')}
            label="Bullet list"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <List />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive('orderedList')}
            label="Numbered list"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive('blockquote')}
            label="Quote"
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          >
            <Quote />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive('codeBlock')}
            label="Code block"
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          >
            <Code />
          </ToolbarButton>
          <span className="mx-1 h-6 w-px shrink-0 bg-border" />
          <ToolbarButton
            active={editor?.isActive({ textAlign: 'left' })}
            label="Align left"
            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
          >
            <AlignLeft />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive({ textAlign: 'center' })}
            label="Align center"
            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
          >
            <AlignCenter />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive({ textAlign: 'right' })}
            label="Align right"
            onClick={() => editor?.chain().focus().setTextAlign('right').run()}
          >
            <AlignRight />
          </ToolbarButton>
          <span className="mx-1 h-6 w-px shrink-0 bg-border" />
          <ToolbarButton
            active={editor?.isActive('link')}
            label="Link"
            onClick={setLink}
          >
            <LinkIcon />
          </ToolbarButton>
          <ToolbarButton
            disabled={!editor?.isActive('link')}
            label="Remove link"
            onClick={() => editor?.chain().focus().unsetLink().run()}
          >
            <Unlink />
          </ToolbarButton>
        </div>
        <div className="min-w-0">
          <EditorContent editor={editor} />
        </div>
      </div>
    </FieldWrapper>
  )
}
