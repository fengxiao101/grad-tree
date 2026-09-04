import gradTreeLogo from '../assets/grad_tree_logo.png';

interface Props {
  className?: string;
}

export function BrandLogo({ className = 'size-6' }: Props) {
  return (
    <img
      src={gradTreeLogo}
      alt=""
      aria-hidden="true"
      className={`object-contain shrink-0 ${className}`}
    />
  );
}
