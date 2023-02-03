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
      'invalid': 'rgb(208, 201, 201)',
      'weak': 'rgb(205, 44, 44)',
      'easy': 'rgb(205, 44, 44)',
      'medium': 'rgb(248, 236, 14)',
      'strong': 'rgb(40, 158, 40)',
    }

  handleChange(event: any): void {
    this.inputValue = event.target.value;
    const strength = this.checkStrength(this.inputValue);
    this.color = (this.colors as any)[strength];
    this.passwordStrength = strength;
  }

  checkStrength(password: string): string {
    const specialCharacters = /[$-/:-?{~!"^_#@`\[\]]+/;
    const digits = /[0-9]+/;
    const letters = /[A-Za-z]+/;

    const hasLetters = letters.test(password);
    const hasDigits = digits.test(password);
    const hasCharacters = specialCharacters.test(password);

    if (password.length === 0) {
      return "invalid";
    }

    if ( password && password.length < 8) {
      return 'weak';
    }

    if (hasLetters && hasDigits && hasCharacters) {
      return 'strong';
    }

    if ((hasLetters && hasDigits) ||
      (hasLetters && hasCharacters) ||
      (hasDigits && hasCharacters)
    ) {
      return 'medium';
    }

    if (hasLetters || hasDigits || hasCharacters) {
      return 'easy';
    }

    return "invalid";
  }
}
