import { Component } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
})

export class PasswordStrengthComponent {
  inputValue = '';
  color = ''
  passwordStrength = ''

  colors = {
      'empty': 'rgb(208, 201, 201)',
      'less': 'rgb(205, 44, 44)',
      'easy': 'rgb(205, 44, 44)',
      'medium': 'rgb(248, 236, 14)',
      'strong': 'rgb(40, 158, 40)',
    }

  handleChange(event: any): void {
    this.inputValue = event.target.value;
    console.log(this.inputValue);
    const strength = this.checkStrength(this.inputValue);
    this.color = (this.colors as any)[strength];
    this.passwordStrength = strength;
  }

  checkStrength(value: string): string {
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;

    const hasLowerLetters = /[a-z]+/.test(value.toLowerCase());
    const hasNumbers = /[0-9]+/.test(value);
    const hasSymbols = regex.test(value);

    if ( value && value.length < 8) {
      console.log('in less')
      return 'less';
    } else {
      if (hasLowerLetters && hasNumbers && hasSymbols) {
        console.log('strong, all types');
        return 'strong';
      } else if (
        (hasLowerLetters && hasNumbers) ||
        (hasLowerLetters && hasSymbols) ||
        (hasNumbers && hasSymbols)
      ) {
        console.log('medium, 2 types');
        return 'medium';
      } else if (hasLowerLetters || hasNumbers || hasSymbols) {
        console.log('easy, only 1 type');
        return 'easy';
      }
    }
    console.log('empty')
    return 'empty';
  }
}
