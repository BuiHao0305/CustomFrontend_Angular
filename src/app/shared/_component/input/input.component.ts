import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appCustomInput]',
  standalone: true,
})
export class InputDirective implements OnInit {
  @Input() inputType = 'text';
  @Input() iconStart = '';
  @Input() iconEnd = '';
  @Input() labelOptions = [];

  private container: HTMLElement | undefined;
  private startIcon: HTMLElement | undefined;
  private endIcon: HTMLElement | undefined;
  private selectLabel: HTMLSelectElement | undefined;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.createCustomInput();
  }

  private createCustomInput() {
    const inputElement = this.el.nativeElement;

    // Tạo container bao ngoài
    this.container = this.renderer.createElement('div');
    this.renderer.setStyle(this.container, 'position', 'relative');
    this.renderer.setStyle(this.container, 'display', 'flex');
    this.renderer.setStyle(this.container, 'align-items', 'center');
    this.renderer.setStyle(this.container, 'border', '1px solid #ccc');
    this.renderer.setStyle(this.container, 'border-radius', '4px');
    this.renderer.setStyle(this.container, 'padding', '4px 8px');
    this.renderer.setStyle(this.container, 'gap', '8px');

    // Đặt input vào container
    this.renderer.appendChild(this.container, inputElement);
    this.renderer.setStyle(inputElement, 'border', 'none');
    this.renderer.setStyle(inputElement, 'outline', 'none');
    this.renderer.setStyle(inputElement, 'flex', '1');
    this.renderer.setStyle(inputElement, 'min-width', '0');
    this.renderer.setAttribute(inputElement, 'type', this.inputType);

    // Tạo iconStart nếu có
    if (this.iconStart) {
      this.startIcon = this.renderer.createElement('span');
      this.renderer.setProperty(this.startIcon, 'innerHTML', this.iconStart);
      this.renderer.setStyle(this.startIcon, 'font-size', '16px');
      this.renderer.setStyle(this.startIcon, 'color', '#888');
      this.renderer.appendChild(this.container, this.startIcon);
    }

    // Tạo iconEnd nếu có
    if (this.iconEnd) {
      this.endIcon = this.renderer.createElement('span');
      this.renderer.setProperty(this.endIcon, 'innerHTML', this.iconEnd);
      this.renderer.setStyle(this.endIcon, 'font-size', '16px');
      this.renderer.setStyle(this.endIcon, 'color', '#888');
      this.renderer.appendChild(this.container, this.endIcon);
    }

    // Tạo dropdown label nếu có
    if (this.labelOptions.length > 0) {
      this.selectLabel = this.renderer.createElement('select');
      this.renderer.setStyle(this.selectLabel, 'border', 'none');
      this.renderer.setStyle(this.selectLabel, 'outline', 'none');
      this.renderer.setStyle(this.selectLabel, 'background', 'transparent');
      this.renderer.setStyle(this.selectLabel, 'font-size', '14px');
      this.renderer.setStyle(this.selectLabel, 'color', '#555');

      // Thêm các option vào select
      this.labelOptions.forEach((label) => {
        const option = this.renderer.createElement('option');
        this.renderer.setProperty(option, 'value', label);
        this.renderer.setProperty(option, 'textContent', label);
        this.renderer.appendChild(this.selectLabel, option);
      });

      this.renderer.appendChild(this.container, this.selectLabel);
    }

    // Thay thế input bằng container
    const parent = inputElement.parentNode;
    if (parent) {
      this.renderer.insertBefore(parent, this.container, inputElement);
      this.renderer.removeChild(parent, inputElement);
    }
  }

  @HostListener('focus') onFocus() {
    this.renderer.setStyle(this.container, 'border', '1px solid #007bff');
  }

  @HostListener('blur') onBlur() {
    this.renderer.setStyle(this.container, 'border', '1px solid #ccc');
  }
}
