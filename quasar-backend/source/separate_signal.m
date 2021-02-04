function [sop_signal,sat_signal] = separate_signal(file_name)

    data = read_complex_binary(file_name);
    data_fft = fftshift(fft(data));
    sop_signal = ifft(fftshift([zeros(ceil(0.75*length(data_fft)/2),1);data_fft(1:ceil(0.25*length(data_fft)));zeros(ceil(0.75*length(data_fft)/2,1))]));
    sat_signal = ifft(fftshift([zeros(ceil(0.25*length(data_fft)),1);data_fft(ceil(0.25*length(data_fft))+1:end)]));
    
end