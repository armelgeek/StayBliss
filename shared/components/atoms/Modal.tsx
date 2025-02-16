"use client";

import { cloneElement, createContext, JSX, useContext, useState } from "react";
import { createPortal } from "react-dom";



export type ModalContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

function Modal({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return <ModalContext.Provider value={{ isOpen, open, close }}>{children}</ModalContext.Provider>;
}

function Overlay({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element {
  const { isOpen } = useContext(ModalContext) as ModalContextType;
  return <>{isOpen ? createPortal(<div>{children}</div>, document.body) : null}</>;
}

function Heading({ children }: { children: string }): JSX.Element {
  return <h2>{children}</h2>;
}

function ToggleOpen({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element {
  const { open } = useContext(ModalContext) as ModalContextType;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return cloneElement(children, { onClick: open });
}

function Wrapper({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element {
  return <div>{children}</div>;
}

function ToggleClose({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element {
  const { close } = useContext(ModalContext) as ModalContextType;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return cloneElement(children, { onClick: close });
}

Modal.Heading = Heading;
Modal.ToggleOpen = ToggleOpen;
Modal.Wrapper = Wrapper;
Modal.Overlay = Overlay;
Modal.ToggleClose = ToggleClose;

export default Modal;
